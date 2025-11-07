import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Calendar, Flag, Tag, BookOpen, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { modalVariants, backdropVariants } from '../utils/animations';

export const AddTaskModal = ({ 
  isOpen, 
  onClose, 
  onAddTask, 
  hapticFeedback,
  scheduleSubjects = [] // Список предметов из расписания
}) => {
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState(null);
  const [priority, setPriority] = useState('medium');
  const [deadline, setDeadline] = useState('');
  const [subject, setSubject] = useState('');
  const [saving, setSaving] = useState(false);
  const [dragY, setDragY] = useState(0);
  
  const modalRef = useRef(null);
  
  // Блокируем скролл страницы при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Категории задач
  const categories = [
    { id: 'study', label: 'Учеба', emoji: '📚', color: 'from-blue-400 to-blue-500' },
    { id: 'personal', label: 'Личное', emoji: '🏠', color: 'from-green-400 to-green-500' },
    { id: 'sport', label: 'Спорт', emoji: '🏃', color: 'from-red-400 to-red-500' },
    { id: 'project', label: 'Проекты', emoji: '💼', color: 'from-purple-400 to-purple-500' },
  ];
  
  // Приоритеты
  const priorities = [
    { id: 'low', label: 'Низкий', color: 'bg-green-100 text-green-700 border-green-200' },
    { id: 'medium', label: 'Средний', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    { id: 'high', label: 'Высокий', color: 'bg-red-100 text-red-700 border-red-200' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!taskText.trim()) return;
    
    try {
      setSaving(true);
      hapticFeedback && hapticFeedback('impact', 'medium');
      
      // Создаем объект задачи с дополнительными полями
      const taskData = {
        text: taskText.trim(),
        category: category,
        priority: priority,
        deadline: deadline ? new Date(deadline).toISOString() : null,
        subject: subject || null,
      };
      
      await onAddTask(taskData);
      
      // Очищаем все поля и закрываем модальное окно
      setTaskText('');
      setCategory(null);
      setPriority('medium');
      setDeadline('');
      setSubject('');
      onClose();
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (saving) return; // Не закрываем во время сохранения
    setTaskText('');
    setCategory(null);
    setPriority('medium');
    setDeadline('');
    setSubject('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={backdropVariants}
        onClick={handleClose}
      >
        <motion.div 
          className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative z-[10000]"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-[#1C1C1E]">Новая задача</h2>
            </div>
            <button
              onClick={handleClose}
              disabled={saving}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Описание задачи */}
            <div>
              <label className="block text-sm font-medium text-[#1C1C1E] mb-2">
                Описание задачи
              </label>
              <textarea
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Например: Купить продукты, Подготовиться к экзамену..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none placeholder-gray-400 text-[#1C1C1E]"
                rows="3"
                autoFocus
                disabled={saving}
                maxLength={500}
              />
              <p className="text-xs text-gray-400 mt-1 text-right">
                {taskText.length} / 500
              </p>
            </div>

            {/* Категория */}
            <div>
              <label className="block text-sm font-medium text-[#1C1C1E] mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Категория
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(category === cat.id ? null : cat.id);
                      hapticFeedback && hapticFeedback('selection');
                    }}
                    disabled={saving}
                    className={`
                      px-3 py-2 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-2 justify-center
                      ${category === cat.id
                        ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-md`
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                      }
                      disabled:opacity-50
                    `}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Приоритет */}
            <div>
              <label className="block text-sm font-medium text-[#1C1C1E] mb-2 flex items-center gap-2">
                <Flag className="w-4 h-4" />
                Приоритет
              </label>
              <div className="flex gap-2">
                {priorities.map((prior) => (
                  <button
                    key={prior.id}
                    type="button"
                    onClick={() => {
                      setPriority(prior.id);
                      hapticFeedback && hapticFeedback('selection');
                    }}
                    disabled={saving}
                    className={`
                      flex-1 px-3 py-2 rounded-xl border-2 transition-all text-sm font-medium
                      ${priority === prior.id
                        ? `${prior.color} border-transparent`
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                      }
                      disabled:opacity-50
                    `}
                  >
                    {prior.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Дедлайн */}
            <div>
              <label className="block text-sm font-medium text-[#1C1C1E] mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Дедлайн
              </label>
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                disabled={saving}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-[#1C1C1E] disabled:opacity-50"
              />
            </div>

            {/* Привязка к предмету */}
            {scheduleSubjects.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-[#1C1C1E] mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Предмет из расписания
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-[#1C1C1E] disabled:opacity-50"
                >
                  <option value="">Без привязки</option>
                  {scheduleSubjects.map((subj, idx) => (
                    <option key={idx} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-medium transition-colors disabled:opacity-50"
              >
                Отмена
              </motion.button>
              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                disabled={!taskText.trim() || saving}
                className={`
                  flex-1 px-6 py-3 rounded-2xl font-medium transition-all
                  ${taskText.trim() && !saving
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white shadow-lg shadow-yellow-500/50'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div 
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Сохранение...
                  </span>
                ) : (
                  'Добавить задачу'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

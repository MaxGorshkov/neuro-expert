import React, { useState } from 'react';

const App = () => {
  // Состояния для навигации
  const [activeTab, setActiveTab] = useState('dashboard');
  const [clients, setClients] = useState([
    { id: 1, name: 'Алексей Петров', age: 8, lastExamDate: '2023-06-15' },
    { id: 2, name: 'Мария Иванова', age: 7, lastExamDate: '2023-07-20' }
  ]);
  const [exams] = useState([
    { id: 1, title: 'Когнитивное тестирование', description: 'Оценка внимания и памяти' },
    { id: 2, title: 'Эмоциональная диагностика', description: 'Анализ эмоционального состояния' },
    { id: 3, title: 'Речевая артикуляция', description: 'Оценка речевых навыков' }
  ]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [quickLink, setQuickLink] = useState('');

  // Функции управления клиентами
  const addClient = (client) => {
    setClients([...clients, { ...client, id: clients.length + 1 }]);
  };

  const updateClient = (id, updatedData) => {
    setClients(clients.map(client => 
      client.id === id ? { ...client, ...updatedData } : client
    ));
  };

  // Генерация быстрой ссылки
  const generateQuickLink = () => {
    const link = `https://neuropsy.local/exam/${selectedExam?.id}/${Date.now()}`;
    setQuickLink(link);
    setShowLinkModal(true);
  };

  // Макеты компонентов

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Добро пожаловать, Нейропсихолог!</h2>
        <p className="text-gray-600">Вы находитесь в личном кабинете для управления клиентами и экзаменами</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-blue-500 text-2xl mb-3">👥</div>
          <h3 className="font-semibold text-gray-800">{clients.length} клиентов</h3>
          <p className="text-sm text-gray-500 mt-1">Зарегистрировано в системе</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-purple-500 text-2xl mb-3">📚</div>
          <h3 className="font-semibold text-gray-800">{exams.length} экзаменов</h3>
          <p className="text-sm text-gray-500 mt-1">Доступно в базе данных</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-green-500 text-2xl mb-3">💰</div>
          <h3 className="font-semibold text-gray-800">Следующий платёж</h3>
          <p className="text-sm text-gray-500 mt-1">15 июля 2023, 4990 ₽</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Последние действия</h3>
        <div className="space-y-3">
          {clients.slice(0, 3).map(client => (
            <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">{client.name}</span>
              <span className="text-sm text-gray-500">Последний экзамен: {client.lastExamDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ClientManager = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Управление клиентами</h2>
        <button 
          onClick={() => {
            setSelectedClient({ name: '', age: '' });
            setActiveTab('clientForm');
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Добавить клиента
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => (
          <div key={client.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-800">{client.name}</h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {client.age} лет
              </span>
            </div>
            <p className="text-gray-600 mb-4">Последний экзамен: {client.lastExamDate}</p>
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  setSelectedClient(client);
                  setActiveTab('clientForm');
                }}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Редактировать
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Просмотреть карту
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ClientForm = () => {
    const [formData, setFormData] = useState(selectedClient || { name: '', age: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedClient?.id) {
        updateClient(selectedClient.id, formData);
      } else {
        addClient(formData);
      }
      setActiveTab('clients');
    };

    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Форма клиента</h2>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Имя ребенка</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Возраст</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Сохранить
            </button>
            <button 
              onClick={() => setActiveTab('clients')}
              className="text-gray-500 hover:text-gray-700 px-6 py-2 rounded-lg"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    );
  };

  const ExamManager = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Выбор экзамена</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map(exam => (
          <div key={exam.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">{exam.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">ИИ-анализ</span>
              <button 
                onClick={() => {
                  setSelectedExam(exam);
                  setActiveTab('examProcess');
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                Выбрать
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ExamProcess = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{selectedExam?.title}</h2>
        <button 
          onClick={() => setActiveTab('exams')}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Назад к экзаменам
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Просмотр экзамена</h3>
          
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="text-4xl mb-2">👁️</div>
              <p className="text-gray-600">Просмотр экзамена в режиме оценки</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">Клиент: {selectedClient?.name || 'Не выбран'}</span>
            <div className="space-x-3">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                Остановить
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                Завершить
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">Действия</h3>
            <button 
              onClick={generateQuickLink}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
            >
              Создать быструю ссылку
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">Карта клиента</h3>
            <p className="text-gray-600 text-sm mb-4">
              Результаты прохождения экзаменов: 2/5 завершено
            </p>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors">
              Просмотреть историю
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">Результаты</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Внимание</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Память</span>
                <span className="text-sm font-medium">82%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Логика</span>
                <span className="text-sm font-medium">68%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ResultsView = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Результаты экзаменов</h2>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-gray-800">История прохождения экзаменов</h3>
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
            <option>Все клиенты</option>
            {clients.map(client => (
              <option key={client.id}>{client.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div>
              <h4 className="font-medium text-gray-800">Алексей Петров</h4>
              <p className="text-sm text-gray-500">Когнитивное тестирование - 2023-06-15</p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Завершен
            </span>
          </div>

          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div>
              <h4 className="font-medium text-gray-800">Мария Иванова</h4>
              <p className="text-sm text-gray-500">Эмоциональная диагностика - 2023-07-20</p>
            </div>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              В процессе
            </span>
          </div>

          <div className="flex items-center justify-between p-4">
            <div>
              <h4 className="font-medium text-gray-800">Иван Смирнов</h4>
              <p className="text-sm text-gray-500">Речевая артикуляция - 2023-07-10</p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Завершен
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Анализ по показателям</h3>
          <div className="space-y-4">
            {['Внимание', 'Память', 'Логика'].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">{item}</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item === 'Внимание' ? 'bg-blue-500' : 
                      item === 'Память' ? 'bg-purple-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${75 + index * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Рекомендации</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Регулярное тренирование внимания
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Развитие памяти через игры
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠️</span>
              Повысить интерес к логическим задачам
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Профиль пользователя</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-4" />
            <h3 className="text-center font-medium text-gray-800">Нейропсихолог</h3>
            <p className="text-center text-sm text-gray-500">Иванов Иван Иванович</p>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Электронная почта</label>
              <input 
                type="email" 
                value="ivanov@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Номер телефона</label>
              <input 
                type="tel" 
                value="+7 (999) 123-45-67"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Специализация</label>
              <input 
                type="text" 
                value="Детская нейропсихология"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Информация о следующем платеже</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Следующий платёж</h4>
            <p className="text-3xl font-bold text-blue-500 mb-1">4990 ₽</p>
            <p className="text-sm text-gray-500">Включая НДС 20%</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Дата платежа</h4>
            <p className="text-xl font-semibold text-gray-800 mb-1">15 июля 2023</p>
            <p className="text-sm text-gray-500">Платёж автоматический</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-800 mb-3">История платежей</h4>
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div key={item} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Оплата за {item === 1 ? 'июнь' : 'май'} 2023</span>
                <span className="font-medium">4990 ₽</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Modal = () => (
    showLinkModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
          <h3 className="font-semibold text-gray-800 mb-4">Быстрая ссылка</h3>
          <p className="text-sm text-gray-600 mb-4">
            Отправьте эту ссылку ребенку для прохождения экзамена:
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 break-all">
            {quickLink}
          </div>
          <button 
            onClick={() => setShowLinkModal(false)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="text-xl font-bold text-blue-500">NeuroPsych</div>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'dashboard', name: 'Главная' },
                { id: 'clients', name: 'Клиенты' },
                { id: 'exams', name: 'Экзамены' },
                { id: 'results', name: 'Результаты' },
                { id: 'profile', name: 'Профиль' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab.id 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                ИИ
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'clients' && <ClientManager />}
        {activeTab === 'clientForm' && <ClientForm />}
        {activeTab === 'exams' && <ExamManager />}
        {activeTab === 'examProcess' && <ExamProcess />}
        {activeTab === 'results' && <ResultsView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Модальное окно */}
      <Modal />
    </div>
  );
};

export default App;

import React, { useState } from "react";

// Simple single-file React + Tailwind mockup of the neuropsychologist platform
// Default export is App component. Use this file to preview basic screens and flows.

export default function App() {
  const [route, setRoute] = useState("dashboard");
  const [clients, setClients] = useState(sampleClients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">NP</div>
            <div>
              <h1 className="text-2xl font-semibold">NeuroPlatform — кабинет нейропсихолога</h1>
              <p className="text-sm text-gray-500">Прототип интерфейса для управления клиентами и экзаменами</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium">Екатерина Иванова</div>
              <div className="text-xs text-gray-500">Тариф: Профессиональный — оплата до 2025-09-01</div>
            </div>
            <img src="https://avatars.dicebear.com/api/identicon/kate.svg" alt="avatar" className="w-10 h-10 rounded-full" />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-3">
            <nav className="bg-white p-4 rounded-2xl shadow-sm sticky top-6">
              <ul className="space-y-2">
                {navItems.map((n) => (
                  <li key={n.key}>
                    <button
                      onClick={() => { setRoute(n.key); setSelectedClient(null); setSelectedExam(null); }}
                      className={`w-full text-left px-3 py-2 rounded-lg ${route === n.key ? 'bg-indigo-50 ring-1 ring-indigo-200' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 text-center">{n.icon}</span>
                          <span className="font-medium">{n.label}</span>
                        </div>
                        {n.badge && <span className="text-xs text-gray-500">{n.badge}</span>}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-4 text-sm text-gray-500">
              <div className="mb-2 font-semibold">Справка</div>
              <div>Кнопка «Создать ссылку» генерирует быструю ссылку для прохождения экзамена ребёнком.</div>
            </div>
          </aside>

          <main className="col-span-9">
            <div className="space-y-6">
              {route === 'dashboard' && <Dashboard clients={clients} onOpenClient={(c)=>{ setSelectedClient(c); setRoute('clientCard'); }} setRoute={setRoute} />}
              {route === 'clients' && <ClientsScreen clients={clients} onAdd={(c)=> setClients([c, ...clients])} onOpen={(c)=>{ setSelectedClient(c); setRoute('clientCard'); }} />}
              {route === 'exams' && <ExamsScreen exams={sampleExams} onPreview={(e)=>{ setSelectedExam(e); setRoute('examPreview'); }} onCreateLink={(e)=> alert('Ссылка создана: https://np.example/test/'+e.id)} />}
              {route === 'examPreview' && selectedExam && <ExamPreview exam={selectedExam} onBack={()=> setRoute('exams')} />}
              {route === 'results' && <ResultsScreen />}
              {route === 'clientCard' && selectedClient && <ClientCard client={selectedClient} onBack={()=> setRoute('clients')} />}
              {route === 'profile' && <ProfileScreen />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// ---------- Sample components ----------

function Dashboard({ clients, onOpenClient, setRoute }){
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Дашборд</h2>
        <div className="text-sm text-gray-500">Всего клиентов: <span className="font-medium">{clients.length}</span></div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="text-sm text-gray-500">Новые ответы за неделю</div>
          <div className="mt-3 text-2xl font-bold">12</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="text-sm text-gray-500">Оценено ИИ</div>
          <div className="mt-3 text-2xl font-bold">8</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="text-sm text-gray-500">Требуют внимания</div>
          <div className="mt-3 text-2xl font-bold text-amber-600">2</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Короткий список клиентов</h3>
          <button onClick={()=>{setRoute('clients');}} className="text-sm text-indigo-600">Управление клиентами →</button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <ul className="space-y-3">
            {clients.slice(0,4).map(c=> (
              <li key={c.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">👧</div>
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.age} лет — {c.exams.length} экзаменов</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=> onOpenClient(c)} className="text-sm text-indigo-600">Открыть</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ClientsScreen({ clients, onAdd, onOpen }){
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', dob: '', parent: '' });

  function submit(){
    if(!form.name) return alert('Введите имя');
    const newC = { id: String(Date.now()), name: form.name, dob: form.dob, parent: form.parent, age: 7, exams: [] };
    onAdd(newC); setForm({ name:'', dob:'', parent:'' }); setOpen(false);
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Клиенты</h2>
        <div>
          <button onClick={()=> setOpen(true)} className="px-3 py-2 bg-indigo-600 text-white rounded-lg">Добавить клиента</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {clients.map(c=> (
          <div key={c.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-gray-500">{c.age} лет · {c.parent}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=> onOpen(c)} className="text-sm text-indigo-600">Открыть</button>
              <button className="text-sm text-gray-500">Редактировать</button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl">
            <h3 className="font-semibold mb-3">Новый клиент</h3>
            <div className="space-y-3">
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Имя ребёнка" className="w-full p-2 border rounded-lg" />
              <input value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})} placeholder="Дата рождения" className="w-full p-2 border rounded-lg" />
              <input value={form.parent} onChange={e=>setForm({...form,parent:e.target.value})} placeholder="Контакт родителя" className="w-full p-2 border rounded-lg" />
              <div className="flex justify-end gap-2">
                <button onClick={()=> setOpen(false)} className="px-3 py-2 rounded-lg">Отмена</button>
                <button onClick={submit} className="px-3 py-2 bg-indigo-600 text-white rounded-lg">Создать</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ExamsScreen({ exams, onPreview, onCreateLink }){
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Экзамены</h2>
        <div className="text-sm text-gray-500">Выберите экзамен и создайте быструю ссылку</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {exams.map(e=> (
          <div key={e.id} className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="font-semibold">{e.title}</div>
            <div className="text-xs text-gray-500 mt-1">{e.ageRange}</div>
            <p className="text-sm mt-2 text-gray-600">{e.description}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                <button onClick={()=> onPreview(e)} className="px-3 py-1 text-sm rounded-lg border">Просмотреть</button>
                <button onClick={()=> onCreateLink(e)} className="px-3 py-1 text-sm rounded-lg bg-indigo-600 text-white">Создать ссылку</button>
              </div>
              <div className="text-xs text-gray-500">{e.duration} мин</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExamPreview({ exam, onBack }){
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Просмотр экзамена</h2>
          <div className="text-sm text-gray-500">Режим психолога — можно пройти как демонстрация</div>
        </div>
        <div>
          <button onClick={onBack} className="px-3 py-2 rounded-lg">← Назад</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h3 className="font-semibold mb-2">{exam.title}</h3>
        <div className="text-sm text-gray-500 mb-4">{exam.description}</div>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="font-medium">Пример задания:</div>
            <div className="text-sm text-gray-600 mt-2">{exam.sampleTask}</div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="font-medium">Оценка ИИ:</div>
            <div className="text-sm text-gray-600 mt-2">При автоматическом анализе система учитывает методологическую базу и выдаёт рекомендации и интерпретацию.</div>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Пройти как ребёнок →</button>
            <button onClick={onBack} className="px-4 py-2 rounded-lg border">Закрыть</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsScreen(){
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Результаты</h2>
        <div className="text-sm text-gray-500">Отчёты, диаграммы и интерпретация ИИ</div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="text-xs text-gray-500">Когнитивный профиль</div>
            <div className="mt-3 font-bold text-2xl">Норма</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-xs text-gray-500">Эмоциональный статус</div>
            <div className="mt-3 font-bold text-2xl">Позитивно</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-xs text-gray-500">Рекомендации ИИ</div>
            <div className="mt-3 text-sm">Игровые задания 2 раза в неделю, консультация с логопедом при необходимости.</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">История и динамика</h3>
          <div className="h-40 rounded-lg border flex items-center justify-center text-gray-400">[Здесь будет график — интеграция с Recharts]</div>
        </div>

        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 rounded-lg border mr-2">Скачать PDF</button>
          <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Поделиться</button>
        </div>
      </div>
    </section>
  );
}

function ClientCard({ client, onBack }){
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Карта ребёнка — {client.name}</h2>
          <div className="text-sm text-gray-500">Возраст: {client.age} · Родитель: {client.parent || '—'}</div>
        </div>
        <div>
          <button onClick={onBack} className="px-3 py-2 rounded-lg">← Назад</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="text-sm text-gray-500">Последний экзамен</div>
          <div className="mt-2 font-medium">Пример: Развитие внимания</div>
          <div className="text-xs text-gray-500 mt-1">Дата: 2025-07-12</div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="text-sm text-gray-500">Статус</div>
          <div className="mt-2 font-medium text-amber-600">Требует наблюдения</div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="text-sm text-gray-500">Рекомендации</div>
          <div className="mt-2 text-sm">Игровые задания, наблюдение 1 раз в 2 месяца</div>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-2xl shadow-sm">
        <h3 className="font-semibold mb-2">История прохождений</h3>
        <ul className="space-y-3">
          {sampleHistory.map(h=> (
            <li key={h.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{h.exam}</div>
                <div className="text-xs text-gray-500">{h.date}</div>
              </div>
              <div className="text-sm">{h.result}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProfileScreen(){
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Профиль</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="font-medium">Информация</div>
          <div className="text-sm text-gray-500 mt-2">Екатерина Иванова · Нейропсихолог</div>
          <div className="mt-4 text-sm">
            <div>Тариф: Профессиональный</div>
            <div>Следующая оплата: 2025-09-01</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="font-medium">Оплата и подписка</div>
          <div className="text-sm text-gray-500 mt-2">Кнопка продления, история платежей и настройки счета.</div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Продлить подписку</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Sample data ----------

const navItems = [
  { key: 'dashboard', label: 'Дашборд', icon: '🏠' },
  { key: 'clients', label: 'Клиенты', icon: '👧', badge: '12' },
  { key: 'exams', label: 'Экзамены', icon: '📝' },
  { key: 'results', label: 'Результаты', icon: '📊' },
  { key: 'profile', label: 'Профиль', icon: '⚙️' },
];

const sampleClients = [
  { id: 'c1', name: 'Алина', age: 7, parent: 'Мама: Ольга, +7 912 000-00-01', exams: ['e1'] },
  { id: 'c2', name: 'Ира', age: 6, parent: 'Мама: Мария, +7 912 000-00-02', exams: [] },
  { id: 'c3', name: 'Настя', age: 8, parent: 'Папа: Сергей, +7 912 000-00-03', exams: ['e2','e3'] },
  { id: 'c4', name: 'Оля', age: 7, parent: 'Мама: Елена, +7 912 000-00-04', exams: [] },
];

const sampleExams = [
  { id: 'e1', title: 'Развитие внимания (7 лет)', ageRange: '6–8 лет', duration: 18, description: 'Набор задач на внимание и переключение.', sampleTask: 'Найди отличия между картинками.' },
  { id: 'e2', title: 'Память и речь (6–8 лет)', ageRange: '6–8 лет', duration: 15, description: 'Задания на кратковременную и вербальную память.', sampleTask: 'Запомни список слов и повтори.' },
  { id: 'e3', title: 'Пространственная ориентация', ageRange: '7–9 лет', duration: 12, description: 'Задачи на ориентирование в пространстве.', sampleTask: 'Собери пазл за время.' },
];

const sampleHistory = [
  { id: 'h1', exam: 'Развитие внимания', date: '2025-07-12', result: 'Норма' },
  { id: 'h2', exam: 'Память и речь', date: '2025-03-05', result: 'Небольшой дефицит' },
];

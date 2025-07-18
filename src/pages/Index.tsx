import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [character, setCharacter] = useState({
    name: 'Герой',
    class: 'Воин',
    level: 1,
    hp: 100,
    maxHp: 100,
    mp: 50,
    maxMp: 50,
    exp: 0,
    maxExp: 100,
    stats: {
      strength: 10,
      magic: 5,
      defense: 8,
      speed: 6
    },
    gold: 100,
    items: [
      { name: 'Меч новичка', type: 'weapon', rarity: 'common' },
      { name: 'Зелье здоровья', type: 'potion', rarity: 'common' },
      { name: 'Кожаная броня', type: 'armor', rarity: 'common' }
    ]
  });

  const classes = [
    { name: 'Воин', description: 'Мастер ближнего боя', icon: '⚔️' },
    { name: 'Маг', description: 'Владеет магией стихий', icon: '🧙‍♂️' },
    { name: 'Лучник', description: 'Точный стрелок', icon: '🏹' },
    { name: 'Вор', description: 'Быстрый и незаметный', icon: '🗡️' }
  ];

  const quests = [
    { name: 'Первый шаг', description: 'Победить 5 гоблинов', progress: 3, max: 5, reward: '50 золота' },
    { name: 'Сбор трав', description: 'Найти 10 целебных трав', progress: 7, max: 10, reward: 'Зелье маны' },
    { name: 'Загадочный артефакт', description: 'Исследовать древний храм', progress: 0, max: 1, reward: 'Редкий амулет' }
  ];

  const renderMainMenu = () => (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center pixel-style">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold text-amber-200 mb-8 tracking-wider" style={{ fontFamily: 'monospace', textShadow: '3px 3px 0px #000' }}>
          PIXEL RPG
        </h1>
        <h2 className="text-2xl text-amber-300 mb-12" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0px #000' }}>
          ADVENTURE
        </h2>
        <div className="space-y-4">
          {['Новая игра', 'Продолжить', 'Персонаж', 'Квесты', 'Настройки'].map((item, index) => (
            <Button
              key={index}
              onClick={() => {
                if (item === 'Новая игра') setCurrentScreen('character-creation');
                else if (item === 'Персонаж') setCurrentScreen('character');
                else if (item === 'Квесты') setCurrentScreen('quests');
                else if (item === 'Продолжить') setCurrentScreen('game');
              }}
              className="w-48 h-12 bg-amber-700 hover:bg-amber-600 text-amber-100 border-2 border-amber-600 text-lg font-bold pixel-btn"
              style={{ fontFamily: 'monospace', textShadow: '1px 1px 0px #000' }}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCharacterCreation = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-amber-100 border-4 border-amber-800">
          <CardHeader className="bg-amber-700 text-amber-100">
            <CardTitle className="text-2xl font-bold text-center" style={{ fontFamily: 'monospace' }}>
              Создание персонажа
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                    Имя героя:
                  </label>
                  <input
                    type="text"
                    value={character.name}
                    onChange={(e) => setCharacter({...character, name: e.target.value})}
                    className="w-full p-3 border-2 border-amber-600 bg-amber-50 font-mono text-lg"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold mb-4" style={{ fontFamily: 'monospace' }}>
                    Выбери класс:
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {classes.map((cls) => (
                      <Button
                        key={cls.name}
                        onClick={() => setCharacter({...character, class: cls.name})}
                        className={`p-4 text-left ${character.class === cls.name ? 'bg-amber-600 text-amber-100' : 'bg-amber-200 text-amber-800'} border-2 border-amber-600 hover:bg-amber-500`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{cls.icon}</span>
                          <div>
                            <div className="font-bold text-lg">{cls.name}</div>
                            <div className="text-sm opacity-75">{cls.description}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-amber-200 p-6 border-2 border-amber-600 rounded">
                  <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'monospace' }}>
                    Характеристики
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(character.stats).map(([stat, value]) => (
                      <div key={stat} className="flex justify-between items-center">
                        <span className="font-bold capitalize">{stat === 'strength' ? 'Сила' : stat === 'magic' ? 'Магия' : stat === 'defense' ? 'Защита' : 'Скорость'}:</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={value * 10} className="w-24" />
                          <span className="font-mono text-lg">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => setCurrentScreen('menu')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3"
                  >
                    Назад
                  </Button>
                  <Button 
                    onClick={() => setCurrentScreen('game')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3"
                  >
                    Начать игру
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCharacterScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-amber-100 border-4 border-amber-800">
          <CardHeader className="bg-amber-700 text-amber-100">
            <CardTitle className="text-2xl font-bold text-center" style={{ fontFamily: 'monospace' }}>
              Персонаж: {character.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-amber-200">
                <TabsTrigger value="stats" className="font-bold">Характеристики</TabsTrigger>
                <TabsTrigger value="inventory" className="font-bold">Инвентарь</TabsTrigger>
                <TabsTrigger value="skills" className="font-bold">Навыки</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stats" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Класс:</span>
                      <Badge className="bg-amber-600 text-amber-100">{character.class}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Уровень:</span>
                      <span className="font-mono text-xl">{character.level}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Золото:</span>
                      <span className="font-mono text-xl text-yellow-600">{character.gold} 🪙</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-bold">HP:</span>
                        <span className="font-mono">{character.hp}/{character.maxHp}</span>
                      </div>
                      <Progress value={(character.hp / character.maxHp) * 100} className="bg-red-200" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-bold">MP:</span>
                        <span className="font-mono">{character.mp}/{character.maxMp}</span>
                      </div>
                      <Progress value={(character.mp / character.maxMp) * 100} className="bg-blue-200" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-bold">EXP:</span>
                        <span className="font-mono">{character.exp}/{character.maxExp}</span>
                      </div>
                      <Progress value={(character.exp / character.maxExp) * 100} className="bg-green-200" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-200 p-6 border-2 border-amber-600 rounded">
                  <h3 className="text-xl font-bold mb-4">Характеристики</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(character.stats).map(([stat, value]) => (
                      <div key={stat} className="flex justify-between items-center">
                        <span className="font-bold capitalize">
                          {stat === 'strength' ? 'Сила' : stat === 'magic' ? 'Магия' : stat === 'defense' ? 'Защита' : 'Скорость'}:
                        </span>
                        <div className="flex items-center space-x-2">
                          <Progress value={value * 10} className="w-24" />
                          <span className="font-mono text-lg">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="inventory" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {character.items.map((item, index) => (
                    <Card key={index} className="bg-amber-200 border-2 border-amber-600">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">
                            {item.type === 'weapon' ? '⚔️' : item.type === 'potion' ? '🧪' : '🛡️'}
                          </span>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <Badge className={`text-xs ${item.rarity === 'common' ? 'bg-gray-500' : 'bg-blue-500'}`}>
                              {item.rarity === 'common' ? 'Обычный' : 'Редкий'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-amber-100 font-bold py-3">
                  Магазин 🛒
                </Button>
              </TabsContent>
              
              <TabsContent value="skills" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-amber-200 border-2 border-amber-600">
                    <CardHeader>
                      <CardTitle className="text-lg">Боевые навыки</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {['Удар мечом', 'Блок щитом', 'Критический удар'].map((skill, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="font-bold">{skill}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={Math.random() * 100} className="w-20" />
                            <span className="font-mono text-sm">{Math.floor(Math.random() * 10) + 1}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-amber-200 border-2 border-amber-600">
                    <CardHeader>
                      <CardTitle className="text-lg">Магические способности</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {['Огненный шар', 'Исцеление', 'Щит света'].map((skill, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="font-bold">{skill}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={Math.random() * 100} className="w-20" />
                            <span className="font-mono text-sm">{Math.floor(Math.random() * 10) + 1}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3">
                  Потратить очки навыков (5 доступно)
                </Button>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <Button 
                onClick={() => setCurrentScreen('menu')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8"
              >
                Вернуться в меню
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderQuestsScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-amber-100 border-4 border-amber-800">
          <CardHeader className="bg-amber-700 text-amber-100">
            <CardTitle className="text-2xl font-bold text-center" style={{ fontFamily: 'monospace' }}>
              Журнал квестов
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              {quests.map((quest, index) => (
                <Card key={index} className="bg-amber-200 border-2 border-amber-600">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{quest.name}</h3>
                        <p className="text-amber-700">{quest.description}</p>
                      </div>
                      <Badge className="bg-amber-600 text-amber-100">
                        {quest.progress}/{quest.max}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-bold">Прогресс:</span>
                        <span className="font-mono">{quest.progress}/{quest.max}</span>
                      </div>
                      <Progress value={(quest.progress / quest.max) * 100} className="bg-green-200" />
                      <div className="flex justify-between">
                        <span className="font-bold">Награда:</span>
                        <span className="text-green-600 font-bold">{quest.reward}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                onClick={() => setCurrentScreen('menu')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8"
              >
                Вернуться в меню
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderGameScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-700 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Главное игровое поле */}
          <div className="lg:col-span-3">
            <Card className="bg-amber-100 border-4 border-amber-800 h-96">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'monospace' }}>
                  Игровой мир
                </h2>
                <div className="bg-green-600 h-64 border-2 border-green-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Icon name="Trees" size={48} className="mx-auto mb-4" />
                    <p className="text-xl font-bold">Лес новичков</p>
                    <p className="text-sm">Здесь водятся слабые монстры</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Боковая панель */}
          <div className="space-y-4">
            <Card className="bg-amber-100 border-2 border-amber-600">
              <CardHeader className="bg-amber-700 text-amber-100 py-2">
                <CardTitle className="text-sm font-bold">Персонаж</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <div className="text-center">
                  <div className="text-2xl mb-2">🧙‍♂️</div>
                  <div className="font-bold text-sm">{character.name}</div>
                  <div className="text-xs text-amber-700">Уровень {character.level}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>HP:</span>
                    <span>{character.hp}/{character.maxHp}</span>
                  </div>
                  <Progress value={(character.hp / character.maxHp) * 100} className="h-2 bg-red-200" />
                  <div className="flex justify-between text-xs">
                    <span>MP:</span>
                    <span>{character.mp}/{character.maxMp}</span>
                  </div>
                  <Progress value={(character.mp / character.maxMp) * 100} className="h-2 bg-blue-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-100 border-2 border-amber-600">
              <CardHeader className="bg-amber-700 text-amber-100 py-2">
                <CardTitle className="text-sm font-bold">Действия</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                {['Исследовать', 'Сражаться', 'Отдохнуть', 'Магазин'].map((action, index) => (
                  <Button
                    key={index}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-amber-100 text-xs py-2"
                  >
                    {action}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Нижняя панель */}
        <div className="mt-4 flex justify-center space-x-4">
          <Button onClick={() => setCurrentScreen('character')} className="bg-purple-600 hover:bg-purple-700 text-white font-bold">
            Персонаж
          </Button>
          <Button onClick={() => setCurrentScreen('quests')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
            Квесты
          </Button>
          <Button onClick={() => setCurrentScreen('menu')} className="bg-red-600 hover:bg-red-700 text-white font-bold">
            Меню
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pixel-rpg">
      {currentScreen === 'menu' && renderMainMenu()}
      {currentScreen === 'character-creation' && renderCharacterCreation()}
      {currentScreen === 'character' && renderCharacterScreen()}
      {currentScreen === 'quests' && renderQuestsScreen()}
      {currentScreen === 'game' && renderGameScreen()}
    </div>
  );
};

export default Index;
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [inBattle, setInBattle] = useState(false);
  const [currentEnemy, setCurrentEnemy] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('forest');
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Звуковые эффекты
  const playSound = (type) => {
    if (!soundEnabled) return;
    
    const sounds = {
      attack: '⚔️',
      victory: '🎉',
      damage: '💥',
      heal: '✨',
      levelup: '🌟',
      coins: '💰'
    };
    
    // Визуальная обратная связь для звуков
    const soundElement = document.createElement('div');
    soundElement.innerHTML = sounds[type] || '🔊';
    soundElement.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      font-size: 24px;
      z-index: 1000;
      animation: soundPulse 0.5s ease-out;
      pointer-events: none;
    `;
    
    document.body.appendChild(soundElement);
    setTimeout(() => document.body.removeChild(soundElement), 500);
  };

  // Добавляем CSS анимацию для звуков
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes soundPulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.8; }
        100% { transform: scale(1); opacity: 0; }
      }
      
      .pixel-battle-shake {
        animation: shake 0.5s ease-in-out;
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      .pixel-victory-glow {
        animation: victoryGlow 2s ease-in-out;
      }
      
      @keyframes victoryGlow {
        0%, 100% { box-shadow: 0 0 0 rgba(255, 215, 0, 0); }
        50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
      }
    `;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, []);
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

  const monsters = [
    { name: 'Гоблин', hp: 30, maxHp: 30, attack: 8, defense: 3, exp: 15, gold: 10, image: '👹' },
    { name: 'Скелет', hp: 45, maxHp: 45, attack: 12, defense: 5, exp: 25, gold: 20, image: '💀' },
    { name: 'Орк', hp: 60, maxHp: 60, attack: 15, defense: 8, exp: 40, gold: 30, image: '👺' }
  ];

  const locations = [
    { name: 'Лес новичков', description: 'Здесь водятся слабые монстры', icon: '🌲', enemies: ['Гоблин'], bgColor: 'from-green-600 to-green-800' },
    { name: 'Тёмная пещера', description: 'Логово нежити', icon: '🕳️', enemies: ['Скелет'], bgColor: 'from-gray-600 to-gray-900' },
    { name: 'Горы орков', description: 'Опасные воины живут здесь', icon: '⛰️', enemies: ['Орк'], bgColor: 'from-red-600 to-red-800' },
    { name: 'Город', description: 'Безопасное место для отдыха', icon: '🏰', enemies: [], bgColor: 'from-blue-600 to-blue-800' }
  ];

  const startBattle = (enemyName) => {
    const enemy = monsters.find(m => m.name === enemyName);
    setCurrentEnemy({...enemy});
    setInBattle(true);
    setBattleLog([`Появился ${enemy.name}! Бой начинается!`]);
  };

  const attack = () => {
    if (!currentEnemy) return;
    
    playSound('attack');
    
    const damage = Math.max(1, character.stats.strength + Math.floor(Math.random() * 10) - currentEnemy.defense);
    const newEnemyHp = Math.max(0, currentEnemy.hp - damage);
    
    const newLog = [...battleLog, `${character.name} наносит ${damage} урона!`];
    
    if (newEnemyHp <= 0) {
      const expGain = currentEnemy.exp;
      const goldGain = currentEnemy.gold;
      
      playSound('victory');
      playSound('coins');
      
      setCharacter(prev => ({
        ...prev,
        exp: prev.exp + expGain,
        gold: prev.gold + goldGain
      }));
      
      newLog.push(`${currentEnemy.name} повержен!`);
      newLog.push(`Получено ${expGain} опыта и ${goldGain} золота!`);
      
      setTimeout(() => {
        setInBattle(false);
        setCurrentEnemy(null);
        setBattleLog([]);
      }, 2000);
    } else {
      const enemyDamage = Math.max(1, currentEnemy.attack + Math.floor(Math.random() * 8) - character.stats.defense);
      const newPlayerHp = Math.max(0, character.hp - enemyDamage);
      
      playSound('damage');
      newLog.push(`${currentEnemy.name} наносит ${enemyDamage} урона!`);
      
      setCharacter(prev => ({...prev, hp: newPlayerHp}));
      
      if (newPlayerHp <= 0) {
        newLog.push('Вы погибли! Игра окончена.');
        setTimeout(() => {
          setInBattle(false);
          setCurrentEnemy(null);
          setBattleLog([]);
          setCurrentScreen('menu');
        }, 2000);
      }
    }
    
    setCurrentEnemy(prev => ({...prev, hp: newEnemyHp}));
    setBattleLog(newLog);
  };

  const usePotion = () => {
    if (character.hp < character.maxHp) {
      const healAmount = 30;
      playSound('heal');
      setCharacter(prev => ({
        ...prev,
        hp: Math.min(prev.maxHp, prev.hp + healAmount)
      }));
      setBattleLog(prev => [...prev, `Использовано зелье! Восстановлено ${healAmount} HP!`]);
    }
  };

  const flee = () => {
    setBattleLog(prev => [...prev, 'Вы сбежали из боя!']);
    setTimeout(() => {
      setInBattle(false);
      setCurrentEnemy(null);
      setBattleLog([]);
    }, 1000);
  };

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
                else if (item === 'Настройки') setCurrentScreen('settings');
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
          <div className="lg:col-span-3">
            {inBattle ? (
              <Card className="bg-amber-100 border-4 border-amber-800 h-96">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-center" style={{ fontFamily: 'monospace' }}>
                    Бой!
                  </h2>
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🧙‍♂️</div>
                      <div className="font-bold">{character.name}</div>
                      <div className="text-sm">Уровень {character.level}</div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>HP:</span>
                          <span>{character.hp}/{character.maxHp}</span>
                        </div>
                        <Progress value={(character.hp / character.maxHp) * 100} className="h-2 bg-red-200" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">{currentEnemy?.image}</div>
                      <div className="font-bold">{currentEnemy?.name}</div>
                      <div className="text-sm">Враг</div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>HP:</span>
                          <span>{currentEnemy?.hp}/{currentEnemy?.maxHp}</span>
                        </div>
                        <Progress value={currentEnemy ? (currentEnemy.hp / currentEnemy.maxHp) * 100 : 0} className="h-2 bg-red-200" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-black text-green-400 p-4 h-32 overflow-y-auto border-2 border-green-600 font-mono text-sm">
                    {battleLog.map((log, index) => (
                      <div key={index} className="mb-1">{log}</div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    <Button onClick={attack} className="bg-red-600 hover:bg-red-700 text-white font-bold">
                      ⚔️ Атака
                    </Button>
                    <Button onClick={usePotion} className="bg-green-600 hover:bg-green-700 text-white font-bold">
                      🧪 Зелье
                    </Button>
                    <Button onClick={flee} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold">
                      🏃 Бежать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-amber-100 border-4 border-amber-800 h-96">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-center" style={{ fontFamily: 'monospace' }}>
                    Карта мира
                  </h2>
                  <div className="grid grid-cols-2 gap-4 h-64">
                    {locations.map((location, index) => {
                      const currentLoc = locations.find(l => l.name === currentLocation) || locations[0];
                      const isCurrentLocation = location.name === currentLoc.name;
                      return (
                        <div
                          key={index}
                          onClick={() => setCurrentLocation(location.name)}
                          className={`bg-gradient-to-br ${location.bgColor} border-2 border-amber-800 rounded-lg p-4 cursor-pointer transition-all hover:scale-105 ${
                            isCurrentLocation ? 'ring-4 ring-yellow-400' : ''
                          }`}
                        >
                          <div className="text-center text-white">
                            <div className="text-3xl mb-2">{location.icon}</div>
                            <p className="text-lg font-bold">{location.name}</p>
                            <p className="text-sm opacity-90">{location.description}</p>
                            {location.enemies.length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs bg-red-600 px-2 py-1 rounded">
                                  Враги: {location.enemies.join(', ')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
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
                <Button
                  onClick={() => {
                    const currentLoc = locations.find(l => l.name === currentLocation) || locations[0];
                    if (currentLoc.enemies.length > 0) {
                      const randomEnemy = currentLoc.enemies[Math.floor(Math.random() * currentLoc.enemies.length)];
                      startBattle(randomEnemy);
                    }
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-xs py-2"
                  disabled={inBattle}
                >
                  ⚔️ Сражаться
                </Button>
                <Button
                  onClick={() => {
                    setCharacter(prev => ({
                      ...prev,
                      hp: prev.maxHp,
                      mp: prev.maxMp
                    }));
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2"
                  disabled={inBattle}
                >
                  🏕️ Отдохнуть
                </Button>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs py-2"
                  disabled={inBattle}
                >
                  🛒 Магазин
                </Button>
                <Button
                  onClick={() => {
                    const expGain = Math.floor(Math.random() * 20) + 10;
                    const goldGain = Math.floor(Math.random() * 15) + 5;
                    setCharacter(prev => ({
                      ...prev,
                      exp: prev.exp + expGain,
                      gold: prev.gold + goldGain
                    }));
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2"
                  disabled={inBattle}
                >
                  🔍 Исследовать
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
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

  const renderSettingsScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-amber-100 border-4 border-amber-800">
          <CardHeader className="bg-amber-700 text-amber-100">
            <CardTitle className="text-2xl font-bold text-center" style={{ fontFamily: 'monospace' }}>
              Настройки
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">🎵 Фоновая музыка:</span>
                <Button
                  onClick={() => setMusicEnabled(!musicEnabled)}
                  className={`w-24 ${musicEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white font-bold`}
                >
                  {musicEnabled ? 'ВКЛ' : 'ВЫКЛ'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">🔊 Звуковые эффекты:</span>
                <Button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-24 ${soundEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white font-bold`}
                >
                  {soundEnabled ? 'ВКЛ' : 'ВЫКЛ'}
                </Button>
              </div>
              
              <div className="bg-amber-200 p-6 border-2 border-amber-600 rounded">
                <h3 className="text-xl font-bold mb-4">Управление</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Атака:</strong> Нажмите кнопку "Атака" в бою</div>
                  <div><strong>Зелье:</strong> Нажмите кнопку "Зелье" для восстановления HP</div>
                  <div><strong>Бегство:</strong> Нажмите кнопку "Бежать" для выхода из боя</div>
                  <div><strong>Перемещение:</strong> Выберите локацию на карте мира</div>
                </div>
              </div>
              
              <div className="bg-amber-200 p-6 border-2 border-amber-600 rounded">
                <h3 className="text-xl font-bold mb-4">О игре</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Версия:</strong> 1.0.0</div>
                  <div><strong>Жанр:</strong> Пиксельная RPG</div>
                  <div><strong>Разработчик:</strong> Pixel RPG Team</div>
                  <div><strong>Особенности:</strong> Система развития персонажа, различные локации, боевая система</div>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={() => setCurrentScreen('menu')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8"
                >
                  Вернуться в меню
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
      {currentScreen === 'settings' && renderSettingsScreen()}
    </div>
  );
};

export default Index;
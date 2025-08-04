import React, { useState, useEffect } from 'react';
import { Play, Heart, Flame, Star, Trophy, Volume2, Check, X, ArrowRight, Home, User } from 'lucide-react';

const PlantLearningApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [energy, setEnergy] = useState(25);
  const [streak, setStreak] = useState(3);
  const [coins, setCoins] = useState(120);
  const [stars, setStars] = useState(245);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [userInput, setUserInput] = useState('');

  // Sample lessons based on your question data
  const lessons = [
    {
      id: 'A1',
      title: 'Plant Parts Basics',
      icon: '🌱',
      questions: [
        {
          type: 'teach-card',
          content: 'This is a plant — a living thing.',
          image: '🌱',
          imageAlt: 'A whole plant in a pot'
        },
        {
          type: 'teach-card',
          content: 'This is soil — ground where a plant stays.',
          image: '🪨',
          imageAlt: 'Soil close-up'
        },
        {
          type: 'teach-card',
          content: 'Roots — are like legs of plant; they stay inside soil.',
          image: '🌿',
          imageAlt: 'Plant roots in soil diagram'
        },
        {
          type: 'image-mcq',
          content: '🌱 Tap the plant',
          options: [
            { text: 'Plant', image: '🪴', correct: true },
            { text: 'Dog', image: '🐕', correct: false },
            { text: 'Car', image: '🚗', correct: false }
          ]
        },
        {
          type: 'fill-blank',
          content: 'Plants have green _____',
          image: '🍃',
          correctAnswer: 'leaves',
          alternatives: ['leaf']
        }
      ]
    },
    {
      id: 'A2',
      title: 'Plant Structure',
      icon: '🌿',
      questions: [
        {
          type: 'teach-card',
          content: 'Stem — holds plant up; carries water to leaves',
          image: '🌾',
          imageAlt: 'Stem with water arrows'
        },
        {
          type: 'teach-card',
          content: 'Leaves — green shapes on stem; catch sunlight to make food',
          image: '🍃',
          imageAlt: 'Leaves with sun rays'
        },
        {
          type: 'text-mcq',
          content: 'Which part carries water to leaves?',
          options: [
            { text: 'Roots', correct: false },
            { text: 'Stem', correct: true },
            { text: 'Leaves', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Tap the soil (ground)',
          options: [
            { text: 'Soil', image: '🟤', correct: true },
            { text: 'Water', image: '💧', correct: false },
            { text: 'Sky', image: '☁️', correct: false }
          ]
        }
      ]
    },
    {
      id: 'B1',
      title: 'Plant Height',
      icon: '🌳',
      questions: [
        {
          type: 'teach-card',
          content: 'Height = how tall or short a plant is',
          image: '📏',
          imageAlt: 'Ruler beside plant'
        },
        {
          type: 'image-mcq',
          content: 'Tall means more height. Tap the taller one',
          options: [
            { text: 'Coconut Tree', image: '🌴', correct: true },
            { text: 'Bush', image: '🌿', correct: false },
            { text: 'Grass', image: '🌱', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'A coconut tree is...',
          image: '🌴',
          options: [
            { text: 'Short', correct: false },
            { text: 'Tall', correct: true }
          ]
        },
        {
          type: 'text-mcq',
          content: 'A grass plant is...',
          image: '🌾',
          options: [
            { text: 'Short', correct: true },
            { text: 'Tall', correct: false }
          ]
        }
      ]
    },
    {
      id: 'B2',
      title: 'Stem Thickness',
      icon: '🌾',
      questions: [
        {
          type: 'teach-card',
          content: 'Thickness = how wide the stem is',
          image: '〰️',
          imageAlt: 'Two stems side-by-side (thick vs thin)'
        },
        {
          type: 'image-mcq',
          content: 'Thick stem → more width. Tap thick',
          options: [
            { text: 'Mango stem', image: '🌳', correct: true },
            { text: 'Coriander stem', image: '🌿', correct: false },
            { text: 'Grass stem', image: '🌾', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Thin stem → less width. Tap thin.',
          options: [
            { text: 'Neem stem', image: '🌳', correct: false },
            { text: 'Coriander stem', image: '🌿', correct: true },
            { text: 'Banyan stem', image: '🌳', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Which stem is thick?',
          options: [
            { text: 'Coriander 🌿', correct: false },
            { text: 'Neem 🌳', correct: true },
            { text: 'Grass 🌾', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Which stem is thin?',
          options: [
            { text: 'Coriander 🌿', correct: true },
            { text: 'Banyan 🌳', correct: false },
            { text: 'Mango 🌳', correct: false }
          ]
        }
      ]
    },
    {
      id: 'B3',
      title: 'Hardness & Strength',
      icon: '🪨',
      questions: [
        {
          type: 'teach-card',
          content: 'Hardness = how difficult to bend/break.',
          image: '✋',
          imageAlt: 'Hand trying to bend stick'
        },
        {
          type: 'teach-card',
          content: 'Hard things don\'t bend/break easily.',
          image: '🪨',
          imageAlt: 'Rock (hand holding)'
        },
        {
          type: 'teach-card',
          content: 'Soft things bend/squish easily.',
          image: '☁️',
          imageAlt: 'Cotton ball (hand squishing)'
        },
        {
          type: 'fill-blank',
          content: 'Hardness is how hard it is to ______ something.',
          correctAnswer: 'break',
          alternatives: ['bend']
        },
        {
          type: 'text-mcq',
          content: 'Which is usually hard?',
          options: [
            { text: 'Metal spoon', correct: true },
            { text: 'Cotton ball', correct: false },
            { text: 'Sponge', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Tap the soft object',
          options: [
            { text: 'Cotton ball', image: '☁️', correct: true },
            { text: 'Rock', image: '🪨', correct: false },
            { text: 'Steel spoon', image: '🥄', correct: false }
          ]
        },
        {
          type: 'true-false',
          content: 'Hard things do not break easily',
          correctAnswer: true
        },
        {
          type: 'text-mcq',
          content: 'Which would bend/break more easily if you press?',
          options: [
            { text: 'Mango 🌳', correct: false },
            { text: 'Coriander 🌿', correct: true }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Which would not bend easily if you press?',
          options: [
            { text: 'Mango 🌳', correct: true },
            { text: 'Grass 🌾', correct: false }
          ]
        }
      ]
    },
    {
      id: 'B4',
      title: 'Review & Quick Tests',
      icon: '⚡',
      questions: [
        {
          type: 'text-mcq',
          content: 'Memory: Which part makes food?',
          options: [
            { text: 'Stem', correct: false },
            { text: 'Roots', correct: false },
            { text: 'Leaves', correct: true }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Quick Tap! Which one is tall & thick?',
          options: [
            { text: 'Mango 🌳', correct: true },
            { text: 'Grass 🌾', correct: false },
            { text: 'Coriander 🌿', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Select "short & thin" plant.',
          options: [
            { text: 'Grass patch', image: '🌾', correct: true },
            { text: 'Mango tree', image: '🌳', correct: false },
            { text: 'Neem tree', image: '🌳', correct: false }
          ]
        }
      ]
    },
    {
      id: 'C1',
      title: 'Plant Groups',
      icon: '📚',
      questions: [
        {
          type: 'teach-card',
          content: 'Group = put similar things together.',
          image: '📚',
          imageAlt: 'School bag with books grouped by subject'
        },
        {
          type: 'teach-card',
          content: 'We can group plants by size and stem: tree, shrub, herb.',
          image: '🌳🌿🌾',
          imageAlt: 'Lineup (tree–shrub–herb side-by-side)'
        }
      ]
    },
    {
      id: 'C2',
      title: 'Trees',
      icon: '🌳',
      questions: [
        {
          type: 'teach-card',
          content: 'Mango tree 🥭🌳 This is a mango tree.',
          image: '🥭',
          imageAlt: 'Mango tree (full height view)'
        },
        {
          type: 'image-mcq',
          content: 'Tap the Mango tree!',
          options: [
            { text: 'Mango tree', image: '🥭', correct: true },
            { text: 'Grass patch', image: '🌾', correct: false },
            { text: 'Rose shrub', image: '🌹', correct: false }
          ]
        },
        {
          type: 'fill-blank',
          content: 'Type the name of this tree.',
          image: '🥭',
          correctAnswer: 'mango',
          alternatives: ['mango tree']
        },
        {
          type: 'teach-card',
          content: 'Banana 🍌🌳 This is a banana tree.',
          image: '🍌',
          imageAlt: 'Banana tree (bunch visible)'
        },
        {
          type: 'image-mcq',
          content: 'Tap the Banana tree!',
          options: [
            { text: 'Banana tree', image: '🍌', correct: true },
            { text: 'Grass patch', image: '🌾', correct: false },
            { text: 'Rose shrub', image: '🌹', correct: false }
          ]
        },
        {
          type: 'fill-blank',
          content: 'Type the name of this tree.',
          image: '🍌',
          correctAnswer: 'banana',
          alternatives: ['banana tree']
        },
        {
          type: 'teach-card',
          content: 'Coconut 🥥🌴 This is a coconut tree.',
          image: '🌴',
          imageAlt: 'Coconut tree (full height view)'
        },
        {
          type: 'image-mcq',
          content: 'Which one is the Coconut tree?',
          options: [
            { text: 'Coconut tree', image: '🌴', correct: true },
            { text: 'Mango tree', image: '🥭', correct: false },
            { text: 'Grass patch', image: '🌾', correct: false }
          ]
        },
        {
          type: 'fill-blank',
          content: 'Type the name of this plant.',
          image: '🌴',
          correctAnswer: 'coconut',
          alternatives: ['coconut tree']
        }
      ]
    },
    {
      id: 'C3',
      title: 'Herbs',
      icon: '🌿',
      questions: [
        {
          type: 'teach-card',
          content: 'Tomato plant 🍅🌿 This is a tomato herb.',
          image: '🍅',
          imageAlt: 'Tomato plant (fruit visible)'
        },
        {
          type: 'image-mcq',
          content: 'Which one is the Tomato plant?',
          options: [
            { text: 'Tomato herb', image: '🍅', correct: true },
            { text: 'Grass patch', image: '🌾', correct: false },
            { text: 'Rose shrub', image: '🌹', correct: false }
          ]
        },
        {
          type: 'fill-blank',
          content: 'Type the name of this plant.',
          image: '🍅',
          correctAnswer: 'tomato',
          alternatives: ['tomato plant']
        },
        {
          type: 'teach-card',
          content: 'Tulsi 🌿 (Holy Basil) is a herb.',
          image: '🌿',
          imageAlt: 'Tulsi plant in pot'
        },
        {
          type: 'image-mcq',
          content: 'Pick the Tulsi plant.',
          options: [
            { text: 'Tulsi herb', image: '🌿', correct: true },
            { text: 'Grass patch', image: '🌾', correct: false },
            { text: 'Rose shrub', image: '🌹', correct: false }
          ]
        },
        {
          type: 'fill-blank',
          content: 'Type the name of this plant.',
          image: '🌿',
          correctAnswer: 'tulsi',
          alternatives: ['holy basil', 'tulsi plant']
        },
        {
          type: 'teach-card',
          content: 'Ginger 🫚🌿 Ginger is an herb.',
          image: '🫚',
          imageAlt: 'Ginger plant (leaves + rhizome)'
        },
        {
          type: 'image-mcq',
          content: 'Tap the Ginger herb.',
          options: [
            { text: 'Ginger plant', image: '🫚', correct: true },
            { text: 'Grass patch', image: '🌾', correct: false },
            { text: 'Coconut tree', image: '🌴', correct: false }
          ]
        },
        {
          type: 'fill-blank',
          content: 'Type the name of this plant.',
          image: '🫚',
          correctAnswer: 'ginger',
          alternatives: ['ginger plant']
        },
        {
          type: 'teach-card',
          content: 'Coriander 🌿🥗 Coriander is an herb.',
          image: '🥗',
          imageAlt: 'Coriander plant (leaves close-up)'
        },
        {
          type: 'image-mcq',
          content: 'Pick the Coriander plant.',
          options: [
            { text: 'Coriander plant', image: '🥗', correct: true },
            { text: 'Tulsi herb', image: '🌿', correct: false },
            { text: 'Banana tree', image: '🍌', correct: false }
          ]
        },
        {
          type: 'fill-blank',
          content: 'Type the name of this plant.',
          image: '🥗',
          correctAnswer: 'coriander',
          alternatives: ['coriander plant']
        }
      ]
    },
    {
      id: 'C4',
      title: 'Grass & Shrubs',
      icon: '🌹',
      questions: [
        {
          type: 'teach-card',
          content: 'Grass 🌾 This is grass.',
          image: '🌾',
          imageAlt: 'Grass patch (ground-level)'
        },
        {
          type: 'image-mcq',
          content: 'Select the grass.',
          options: [
            { text: 'Mango tree', image: '🥭', correct: false },
            { text: 'Grass patch', image: '🌾', correct: true },
            { text: 'Tomato herb', image: '🍅', correct: false }
          ]
        },
        {
          type: 'fill-blank',
          content: 'Type this word (see picture).',
          image: '🌾',
          correctAnswer: 'grass',
          alternatives: []
        },
        {
          type: 'teach-card',
          content: 'Rose 🌹 This is a shrub.',
          image: '🌹',
          imageAlt: 'Rose shrub (flowers visible)'
        },
        {
          type: 'image-mcq',
          content: 'Which one is the Rose shrub?',
          options: [
            { text: 'Rose shrub', image: '🌹', correct: true },
            { text: 'Grass patch', image: '🌾', correct: false },
            { text: 'Mango tree', image: '🥭', correct: false }
          ]
        },
        {
          type: 'fill-blank',
          content: 'Type the name of this plant.',
          image: '🌹',
          correctAnswer: 'rose',
          alternatives: ['rose plant', 'rose shrub']
        }
      ]
    },
    {
      id: 'D1',
      title: 'Plant Categories',
      icon: '🌳',
      questions: [
        {
          type: 'teach-card',
          content: 'Tree: tall, thick, woody stem; branches high. (Mango, Coconut)',
          image: '🌳',
          imageAlt: 'Mango + coconut trees (side-by-side)'
        },
        {
          type: 'teach-card',
          content: 'Shrub: medium height; many woody stems near ground. (Rose, Hibiscus)',
          image: '🌹',
          imageAlt: 'Rose shrub + hibiscus shrub (side-by-side)'
        },
        {
          type: 'teach-card',
          content: 'Herb: small plant; soft, green stem. (Tomato, Coriander, Tulsi, Ginger)',
          image: '🌿',
          imageAlt: 'Tomato + coriander + tulsi (lineup)'
        },
        {
          type: 'text-mcq',
          content: 'Which one is a tree?',
          options: [
            { text: 'Coconut', correct: true },
            { text: 'Tomato', correct: false },
            { text: 'Coriander', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Rose is a...',
          options: [
            { text: 'Shrub', correct: true },
            { text: 'Tree', correct: false },
            { text: 'Herb', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Tap the picture that shows a tree.',
          options: [
            { text: 'Mango tree', image: '🥭', correct: true },
            { text: 'Tulsi herb', image: '🌿', correct: false },
            { text: 'Rose shrub', image: '🌹', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Tap the picture that shows a shrub.',
          options: [
            { text: 'Rose shrub', image: '🌹', correct: true },
            { text: 'Mango tree', image: '🥭', correct: false },
            { text: 'Tulsi herb', image: '🌿', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Tap the picture that shows a herb.',
          options: [
            { text: 'Tulsi herb', image: '🌿', correct: true },
            { text: 'Banyan tree', image: '🌳', correct: false },
            { text: 'Rose shrub', image: '🌹', correct: false }
          ]
        }
      ]
    },
    {
      id: 'D2',
      title: 'Stem Properties',
      icon: '🌾',
      questions: [
        {
          type: 'teach-card',
          content: 'Stems can be small/tall and thin/thick.',
          image: '📏',
          imageAlt: 'Four icons (small, tall, thin, thick)'
        },
        {
          type: 'text-mcq',
          content: 'Which of these has a thin stem?',
          options: [
            { text: 'Coriander', correct: true },
            { text: 'Mango', correct: false },
            { text: 'Banana', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Tap the picture with a thin stem.',
          options: [
            { text: 'Thin stem', image: '🌿', correct: true },
            { text: 'Thick stem', image: '🌳', correct: false },
            { text: 'Short stem', image: '🌾', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Tap the picture with a thick stem.',
          options: [
            { text: 'Thick stem', image: '🌳', correct: true },
            { text: 'Thin stem', image: '🌿', correct: false },
            { text: 'Small stem', image: '🌱', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Which has the thickest stem?',
          options: [
            { text: 'Tree', correct: true },
            { text: 'Shrub', correct: false },
            { text: 'Herb', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Smallest → largest height (correct order)?',
          options: [
            { text: 'Herb → Shrub → Tree', correct: true },
            { text: 'Tree → Shrub → Herb', correct: false },
            { text: 'Shrub → Tree → Herb', correct: false }
          ]
        }
      ]
    },
    {
      id: 'D3',
      title: 'Climbers & Creepers',
      icon: '🧗',
      questions: [
        {
          type: 'teach-card',
          content: 'Climbers: soft, weak stems; need support to go up. (Money plant, Pea)',
          image: '🧗',
          imageAlt: 'Money plant on stick + pea on string'
        },
        {
          type: 'teach-card',
          content: 'Creepers: soft, weak stems; spread on the ground. (Pumpkin, Watermelon)',
          image: '🎃',
          imageAlt: 'Pumpkin plant creeping on ground'
        },
        {
          type: 'text-mcq',
          content: 'Which plant is a climber?',
          options: [
            { text: 'Money plant', correct: true },
            { text: 'Grass', correct: false },
            { text: 'Mango', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Tap the plant that is a climber (needs support).',
          options: [
            { text: 'Climber on stick', image: '🧗', correct: true },
            { text: 'Creeper on ground', image: '🎃', correct: false },
            { text: 'Mango tree', image: '🥭', correct: false }
          ]
        },
        {
          type: 'fill-blank',
          content: 'Climbers need ______ to grow upward.',
          image: '🪜',
          correctAnswer: 'support',
          alternatives: ['stick', 'rope', 'wall', 'pole']
        },
        {
          type: 'text-mcq',
          content: 'Which plant is a creeper?',
          options: [
            { text: 'Pumpkin', correct: true },
            { text: 'Mango', correct: false },
            { text: 'Grass', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Which sentence describes a creeper?',
          options: [
            { text: 'Spreads on the ground', correct: true },
            { text: 'Stands up with support', correct: false },
            { text: 'Has a thick woody stem', correct: false }
          ]
        }
      ]
    },
    {
      id: 'D4',
      title: 'Plant Classification Review',
      icon: '📖',
      questions: [
        {
          type: 'text-mcq',
          content: 'Very big plants with thick stems are called...',
          options: [
            { text: 'Trees', correct: true },
            { text: 'Shrubs', correct: false },
            { text: 'Herbs', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Medium-height plants with hard stems are called...',
          options: [
            { text: 'Shrubs', correct: true },
            { text: 'Trees', correct: false },
            { text: 'Herbs', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Small plants with soft green stems are called...',
          options: [
            { text: 'Herbs', correct: true },
            { text: 'Shrubs', correct: false },
            { text: 'Trees', correct: false }
          ]
        },
        {
          type: 'multiple-correct-mcq',
          content: 'Which pairs are correct?',
          options: [
            { text: 'Banana – Thick & Tall', correct: true },
            { text: 'Grass – Thick & Tall', correct: false },
            { text: 'Grass – Thin & Short', correct: true }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Which one is a shrub?',
          options: [
            { text: 'Rose', correct: true },
            { text: 'Mango', correct: false },
            { text: 'Grass', correct: false }
          ]
        },
        {
          type: 'fill-blank',
          content: 'Describe height of this plant.',
          image: '🥭',
          correctAnswer: 'tall',
          alternatives: []
        },
        {
          type: 'fill-blank',
          content: 'Describe thickness of the stem.',
          image: '🥗',
          correctAnswer: 'thin',
          alternatives: []
        },
        {
          type: 'fill-blank',
          content: 'Describe hardness of this object.',
          image: '🪨',
          correctAnswer: 'hard',
          alternatives: []
        },
        {
          type: 'fill-blank',
          content: 'Group this plant: herb, shrub, or tree?',
          image: '🌹',
          correctAnswer: 'shrub',
          alternatives: []
        },
        {
          type: 'fill-blank',
          content: 'Memory Pop-up: Type the name of the plant shown.',
          image: '🥭',
          correctAnswer: 'mango',
          alternatives: ['mango tree']
        }
      ]
    },
    {
      id: 'E1',
      title: 'Relatable Stories - Height',
      icon: '📏',
      questions: [
        {
          type: 'teach-card',
          content: 'Some things are tall, some are short 📏 — A streetlight is tall; a water bottle is short. Plants can be tall or short too.',
          image: '🚦',
          imageAlt: 'Streetlight (tall) beside water bottle (short)'
        },
        {
          type: 'image-mcq',
          content: 'Which is tall like a big plant?',
          options: [
            { text: 'Streetlight', image: '🚦', correct: true },
            { text: 'Pencil', image: '✏️', correct: false },
            { text: 'Toy car', image: '🚗', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Which is short like a small plant?',
          options: [
            { text: 'Cup', image: '☕', correct: true },
            { text: 'Streetlight', image: '🚦', correct: false },
            { text: 'Building', image: '🏢', correct: false }
          ]
        }
      ]
    },
    {
      id: 'E2',
      title: 'Relatable Stories - Groups',
      icon: '👥',
      questions: [
        {
          type: 'teach-card',
          content: 'We make groups in life 👫 — friends groups, game teams. Plants also have groups like trees, shrubs, herbs.',
          image: '👥',
          imageAlt: 'Collage (friends group, football team, tree–shrub–herb lineup)'
        },
        {
          type: 'image-mcq',
          content: 'Which of these is a "group"?',
          options: [
            { text: 'Football team', image: '⚽', correct: true },
            { text: 'Single shoe', image: '👟', correct: false },
            { text: 'Single chair', image: '🪑', correct: false }
          ]
        },
        {
          type: 'teach-card',
          content: 'In class, some kids are tall, some short. Often, shorter kids sit in the front.',
          image: '🏫',
          imageAlt: 'Classroom with shorter kids in front row'
        },
        {
          type: 'image-mcq',
          content: 'Who sits in the front row in class?',
          options: [
            { text: 'Short kids', image: '👶', correct: true },
            { text: 'Tall kids', image: '🧑', correct: false },
            { text: 'Teacher table only', image: '🪑', correct: false }
          ]
        }
      ]
    },
    {
      id: 'E3',
      title: 'Relatable Stories - Support & Transport',
      icon: '🪢',
      questions: [
        {
          type: 'teach-card',
          content: 'Some things need support to go up 🪢 — a climbing plant needs a stick or rope.',
          image: '🪢',
          imageAlt: 'Money plant tied to a stick'
        },
        {
          type: 'image-mcq',
          content: 'Which needs help to go up, like a climbing plant?',
          options: [
            { text: 'Kite on string', image: '🪁', correct: true },
            { text: 'Ball', image: '⚽', correct: false },
            { text: 'Mug', image: '☕', correct: false }
          ]
        },
        {
          type: 'teach-card',
          content: 'Some parts help move liquid upward — a straw carries juice up, like a stem carries water up.',
          image: '🥤',
          imageAlt: 'Straw in glass with upward arrows'
        },
        {
          type: 'image-mcq',
          content: 'Which carries liquid upward like a stem?',
          options: [
            { text: 'Straw in glass', image: '🥤', correct: true },
            { text: 'Plate', image: '🍽️', correct: false },
            { text: 'Spoon', image: '🥄', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'At home, what moves water from one place to another (like stem)?',
          options: [
            { text: 'Water pipe', image: '🚰', correct: true },
            { text: 'Chair', image: '🪑', correct: false },
            { text: 'Window', image: '🪟', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Which is tall?',
          options: [
            { text: 'Building', image: '🏢', correct: true },
            { text: 'Bottle', image: '🍼', correct: false },
            { text: 'Spoon', image: '🥄', correct: false }
          ]
        },
        {
          type: 'true-false',
          content: 'A streetlight is tall.',
          image: '🚦',
          correctAnswer: true
        },
        {
          type: 'image-mcq',
          content: 'Which is a group (like plant groups)?',
          options: [
            { text: 'Cricket team', image: '🏏', correct: true },
            { text: 'Single sock', image: '🧦', correct: false },
            { text: 'Single eraser', image: '🧽', correct: false }
          ]
        },
        {
          type: 'image-mcq',
          content: 'Which item usually needs support (tie/hold) to stay up?',
          options: [
            { text: 'Poster on wall', image: '📄', correct: true },
            { text: 'Book on table', image: '📚', correct: false },
            { text: 'Ball on floor', image: '⚽', correct: false }
          ]
        }
      ]
    },
    {
      id: 'F1',
      title: 'Voice & Speaking Practice',
      icon: '🎤',
      questions: [
        {
          type: 'speak',
          content: 'Listen & repeat: "Tree" 🌳 — Tap mic and say "Tree".',
          image: '🌳',
          targetWord: 'Tree'
        },
        {
          type: 'speak',
          content: 'Listen & repeat: "Shrub" 🌹 — Tap mic and say "Shrub".',
          image: '🌹',
          targetWord: 'Shrub'
        },
        {
          type: 'speak',
          content: 'Listen & repeat: "Herb" 🌿 — Tap mic and say "Herb".',
          image: '🌿',
          targetWord: 'Herb'
        },
        {
          type: 'speak',
          content: 'Listen & repeat: "Roots" — Tap mic and say "Roots".',
          image: '🌿',
          targetWord: 'Roots'
        },
        {
          type: 'speak',
          content: 'Listen & repeat: "Height" — Tap mic and say "Height".',
          image: '📏',
          targetWord: 'Height'
        },
        {
          type: 'speak',
          content: 'Listen & repeat: "Thickness" — Tap mic and say "Thickness".',
          image: '〰️',
          targetWord: 'Thickness'
        }
      ]
    },
    {
      id: 'F2',
      title: 'Basic Plant Concepts',
      icon: '🌱',
      questions: [
        {
          type: 'text-mcq',
          content: 'Is a plant living or non-living?',
          image: '🪴',
          options: [
            { text: 'Living', correct: true },
            { text: 'Non-living', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Soil is for...',
          image: '🟤',
          options: [
            { text: 'Music', correct: false },
            { text: 'Plant growth', correct: true },
            { text: 'Painting', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Where are roots found?',
          image: '🌿',
          options: [
            { text: 'Inside soil', correct: true },
            { text: 'On leaves', correct: false },
            { text: 'In air', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'The stem...',
          image: '🌾',
          options: [
            { text: 'Carries water', correct: true },
            { text: 'Makes seeds', correct: false },
            { text: 'Eats food', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Leaves...',
          image: '🍃',
          options: [
            { text: 'Make food', correct: true },
            { text: 'Make soil', correct: false },
            { text: 'Carry water', correct: false }
          ]
        }
      ]
    },
    {
      id: 'F3',
      title: 'Properties Review',
      icon: '📐',
      questions: [
        {
          type: 'true-false',
          content: 'Height tells us tall or short.',
          image: '📏',
          correctAnswer: true
        },
        {
          type: 'true-false',
          content: 'Thickness means how heavy something is.',
          image: '〰️',
          correctAnswer: false
        },
        {
          type: 'text-mcq',
          content: 'Tall means...',
          image: '⬆️',
          options: [
            { text: 'More height', correct: true },
            { text: 'Less height', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Short means...',
          image: '⬇️',
          options: [
            { text: 'More height', correct: false },
            { text: 'Less height', correct: true }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Thick stem means ______ thickness.',
          image: '🌳',
          options: [
            { text: 'More', correct: true },
            { text: 'Less', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Thin stem means ______ thickness.',
          image: '🥗',
          options: [
            { text: 'More', correct: false },
            { text: 'Less', correct: true }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Hard things...',
          image: '🪨',
          options: [
            { text: 'Break easily', correct: false },
            { text: 'Do not break easily', correct: true }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Soft things...',
          image: '☁️',
          options: [
            { text: 'Can bend/break easily', correct: true },
            { text: 'Never bend', correct: false }
          ]
        }
      ]
    },
    {
      id: 'F4',
      title: 'Matching Exercises',
      icon: '🔗',
      questions: [
        {
          type: 'match-pairs',
          content: 'Match types to size group',
          leftColumn: ['Tree', 'Shrub', 'Herb'],
          rightColumn: ['Tall', 'Medium', 'Small'],
          correctPairs: [
            { left: 'Tree', right: 'Tall' },
            { left: 'Shrub', right: 'Medium' },
            { left: 'Herb', right: 'Small' }
          ]
        },
        {
          type: 'match-pairs',
          content: 'Match plants to group',
          leftColumn: ['Mango', 'Coconut', 'Banana'],
          rightColumn: ['Tree', 'Shrub', 'Herb'],
          correctPairs: [
            { left: 'Mango', right: 'Tree' },
            { left: 'Coconut', right: 'Tree' },
            { left: 'Banana', right: 'Tree' }
          ]
        },
        {
          type: 'match-pairs',
          content: 'Match plants to group',
          leftColumn: ['Rose', 'Tulsi', 'Coriander'],
          rightColumn: ['Tree', 'Shrub', 'Herb'],
          correctPairs: [
            { left: 'Rose', right: 'Shrub' },
            { left: 'Tulsi', right: 'Herb' },
            { left: 'Coriander', right: 'Herb' }
          ]
        },
        {
          type: 'match-pairs',
          content: 'Match plants to group',
          leftColumn: ['Tomato', 'Grass', 'Ginger'],
          rightColumn: ['Tree', 'Shrub', 'Herb'],
          correctPairs: [
            { left: 'Tomato', right: 'Herb' },
            { left: 'Grass', right: 'Herb' },
            { left: 'Ginger', right: 'Herb' }
          ]
        }
      ]
    },
    {
      id: 'F5',
      title: 'Advanced Plant Analysis',
      icon: '🔬',
      questions: [
        {
          type: 'text-mcq',
          content: 'Mango is a ____ which is ____ in height.',
          image: '🥭',
          options: [
            { text: 'Tree, tall', correct: true },
            { text: 'Shrub, short', correct: false },
            { text: 'Herb, short', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Tulsi is a ____ which has a ____ stem.',
          image: '🌿',
          options: [
            { text: 'Herb, soft', correct: true },
            { text: 'Tree, thick', correct: false },
            { text: 'Shrub, thick', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Rose is a ____ with a stem that is hard but not as ____ as a tree\'s.',
          image: '🌹',
          options: [
            { text: 'Shrub, thick', correct: true },
            { text: 'Herb, thin', correct: false },
            { text: 'Tree, soft', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Tomato is a ____ with a ____ stem.',
          image: '🍅',
          options: [
            { text: 'Herb, soft', correct: true },
            { text: 'Shrub, hard', correct: false },
            { text: 'Tree, thick', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Which has a thicker stem?',
          options: [
            { text: 'Coconut trunk', correct: true },
            { text: 'Coriander stem', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Which is usually softer to press?',
          options: [
            { text: 'Leaf', correct: true },
            { text: 'Wooden stick', correct: false }
          ]
        }
      ]
    },
    {
      id: 'F6',
      title: 'Sentence Building',
      icon: '📝',
      questions: [
        {
          type: 'arrange-tiles',
          content: 'Make a sentence (reorder): Shrubs / height / small / are / in',
          tiles: ['Shrubs', 'are', 'small', 'in', 'height'],
          correctOrder: ['Shrubs', 'are', 'small', 'in', 'height']
        },
        {
          type: 'arrange-tiles',
          content: 'Make a sentence (reorder): Trees / are / tall / and / thick',
          tiles: ['Trees', 'are', 'tall', 'and', 'thick'],
          correctOrder: ['Trees', 'are', 'tall', 'and', 'thick']
        },
        {
          type: 'arrange-tiles',
          content: 'Make a sentence (reorder): Leaves / on / grow / the / stem',
          tiles: ['Leaves', 'grow', 'on', 'the', 'stem'],
          correctOrder: ['Leaves', 'grow', 'on', 'the', 'stem']
        },
        {
          type: 'arrange-tiles',
          content: 'Make a sentence (reorder): Carry / roots / from / water / stems',
          tiles: ['Stems', 'carry', 'water', 'from', 'roots'],
          correctOrder: ['Stems', 'carry', 'water', 'from', 'roots']
        }
      ]
    },
    {
      id: 'F7',
      title: 'Final Exam Review',
      icon: '🎯',
      questions: [
        {
          type: 'text-mcq',
          content: 'Climbers need...',
          image: '🧗',
          options: [
            { text: 'Support', correct: true },
            { text: 'Nothing', correct: false },
            { text: 'Only water', correct: false }
          ]
        },
        {
          type: 'text-mcq',
          content: 'Creepers spread on the...',
          image: '🎃',
          options: [
            { text: 'Ground', correct: true },
            { text: 'Roof', correct: false },
            { text: 'Stem', correct: false }
          ]
        },
        {
          type: 'true-false',
          content: 'Climbers can stand without help.',
          image: '🧗',
          correctAnswer: false
        }
      ]
    }
  ];

  const currentLesson = lessons[currentLessonIndex];
  const currentQuestion = currentLesson?.questions[currentQuestionIndex];

  const handleAnswer = (answer, isAnswerCorrect) => {
    setSelectedAnswer(answer);
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
    
    if (isAnswerCorrect) {
      setCoins(prev => prev + 10);
      setStars(prev => prev + 5);
    } else {
      setEnergy(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (!isCorrect && currentQuestion.type !== 'teach-card') {
      // If answer is wrong, reset the question for retry
      setSelectedAnswer(null);
      setShowResult(false);
      setUserInput('');
      return;
    }

    if (currentQuestionIndex < currentLesson.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Lesson completed
      setCompletedLessons(prev => [...prev, currentLesson.id]);
      setCurrentScreen('home');
      setCurrentQuestionIndex(0);
      setCoins(prev => prev + 20);
      setStars(prev => prev + 25);
    }
    setSelectedAnswer(null);
    setShowResult(false);
    setUserInput('');
  };

  const startLesson = (lessonIndex) => {
    if (energy > 0) {
      setCurrentLessonIndex(lessonIndex);
      setCurrentQuestionIndex(0);
      setCurrentScreen('lesson');
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const checkFillBlank = () => {
    const userAnswer = userInput.toLowerCase().trim();
    const correctAnswers = [currentQuestion.correctAnswer, ...(currentQuestion.alternatives || [])];
    const isAnswerCorrect = correctAnswers.some(answer => answer.toLowerCase() === userAnswer);
    handleAnswer(userAnswer, isAnswerCorrect);
  };

  const renderHomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-orange-500" />
          <span className="font-bold text-lg">{streak}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">🌰</span>
            </div>
            <span className="font-bold">{coins}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-blue-500 fill-current" />
            <span className="font-bold">{stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span className="font-bold">{energy}/25</span>
          </div>
        </div>
      </div>

      {/* Energy Warning */}
      {energy < 5 && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mx-4 mt-4">
          <p className="text-red-700">Low energy! Take a break or watch an ad to refill.</p>
        </div>
      )}

      {/* Lesson Path */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-800 mb-6">🌱 Learn About Plants</h1>
        
        <div className="space-y-4">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = index > 0 && !completedLessons.includes(lessons[index - 1].id);
            const canStart = energy > 0 && !isLocked;
            
            return (
              <div
                key={lesson.id}
                className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                  isCompleted 
                    ? 'bg-green-100 border-green-300' 
                    : canStart
                    ? 'bg-white border-green-200 hover:border-green-300 hover:shadow-md'
                    : 'bg-gray-100 border-gray-200 opacity-60'
                }`}
                onClick={() => canStart && startLesson(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      isCompleted ? 'bg-green-200' : 'bg-green-50'
                    }`}>
                      {isCompleted ? '✅' : lesson.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{lesson.title}</h3>
                      <p className="text-gray-600">{lesson.questions.length} activities</p>
                    </div>
                  </div>
                  {isLocked ? (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      🔒
                    </div>
                  ) : (
                    <Play className="w-8 h-8 text-green-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderLessonScreen = () => {
    if (!currentQuestion) return null;

    const progress = ((currentQuestionIndex) / currentLesson.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        {/* Header */}
        <div className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={() => setCurrentScreen('home')}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <span className="font-bold">{energy}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          {currentQuestion.type === 'teach-card' && (
            <div className="text-center">
              <div className="text-8xl mb-4">{currentQuestion.image}</div>
              <h2 className="text-2xl font-bold mb-4">{currentQuestion.content}</h2>
              <button
                onClick={handleNext}
                className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:bg-green-600 transition-colors flex items-center gap-2 mx-auto"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {currentQuestion.type === 'image-mcq' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">{currentQuestion.content}</h2>
              <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option, option.correct)}
                    disabled={showResult}
                    className={`p-4 rounded-2xl border-2 transition-all text-center ${
                      showResult
                        ? option.correct
                          ? 'bg-green-100 border-green-500'
                          : selectedAnswer === option
                          ? 'bg-red-100 border-red-500'
                          : 'bg-gray-100 border-gray-300'
                        : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-4xl mb-2">{option.image}</div>
                    <div className="font-semibold">{option.text}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentQuestion.type === 'text-mcq' && (
            <div>
              {currentQuestion.image && (
                <div className="text-6xl text-center mb-4">{currentQuestion.image}</div>
              )}
              <h2 className="text-2xl font-bold mb-6 text-center">{currentQuestion.content}</h2>
              <div className="space-y-3 max-w-md mx-auto">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option, option.correct)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-2xl border-2 transition-all font-semibold ${
                      showResult
                        ? option.correct
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : selectedAnswer === option
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-gray-100 border-gray-300'
                        : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentQuestion.type === 'speak' && (
            <div className="text-center">
              <div className="text-6xl mb-4">{currentQuestion.image}</div>
              <h2 className="text-2xl font-bold mb-6">{currentQuestion.content}</h2>
              <div className="bg-blue-50 p-6 rounded-2xl mb-6">
                <p className="text-lg mb-4">Target word: <strong>{currentQuestion.targetWord}</strong></p>
                <button
                  onClick={() => {
                    // Simulate speech recognition - in real app would use Web Speech API
                    const simulatedRecognition = currentQuestion.targetWord.toLowerCase();
                    const isCorrect = true; // For demo, always correct
                    handleAnswer(simulatedRecognition, isCorrect);
                  }}
                  disabled={showResult}
                  className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors flex items-center gap-2 mx-auto"
                >
                  🎤 Tap to Speak
                </button>
              </div>
              <p className="text-sm text-gray-600">Note: Speech recognition would be implemented in production</p>
            </div>
          )}

          {currentQuestion.type === 'match-pairs' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">{currentQuestion.content}</h2>
              <div className="max-w-lg mx-auto">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h3 className="font-bold text-center mb-4">Match from here:</h3>
                    {currentQuestion.leftColumn.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 bg-blue-100 rounded-xl text-center font-semibold cursor-pointer hover:bg-blue-200 transition-colors"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-center mb-4">To here:</h3>
                    {currentQuestion.rightColumn.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 bg-green-100 rounded-xl text-center font-semibold"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      // For demo, show correct pairs
                      setShowResult(true);
                      setIsCorrect(true);
                    }}
                    disabled={showResult}
                    className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-600 transition-colors"
                  >
                    Show Correct Pairs
                  </button>
                </div>
                {showResult && (
                  <div className="mt-4 p-4 bg-green-50 rounded-xl">
                    <h4 className="font-bold mb-2">Correct Pairs:</h4>
                    {currentQuestion.correctPairs.map((pair, index) => (
                      <p key={index} className="text-sm">
                        {pair.left} → {pair.right}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentQuestion.type === 'arrange-tiles' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">{currentQuestion.content}</h2>
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Arrange these words:</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {currentQuestion.tiles.map((tile, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 bg-yellow-100 border-2 border-yellow-300 rounded-lg font-semibold cursor-pointer hover:bg-yellow-200 transition-colors"
                      >
                        {tile}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowResult(true);
                    setIsCorrect(true);
                  }}
                  disabled={showResult}
                  className="w-full bg-green-500 text-white p-4 rounded-2xl font-bold text-lg hover:bg-green-600 transition-colors"
                >
                  Show Correct Order
                </button>
                {showResult && (
                  <div className="mt-4 p-4 bg-green-50 rounded-xl text-center">
                    <h4 className="font-bold mb-2">Correct Sentence:</h4>
                    <p className="text-lg font-semibold text-green-800">
                      {currentQuestion.correctOrder.join(' ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentQuestion.type === 'multiple-correct-mcq' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">{currentQuestion.content}</h2>
              <div className="space-y-3 max-w-md mx-auto">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const correctOptions = currentQuestion.options.filter(opt => opt.correct);
                      const selectedCorrectly = option.correct;
                      handleAnswer(option, selectedCorrectly);
                    }}
                    disabled={showResult}
                    className={`w-full p-4 rounded-2xl border-2 transition-all font-semibold ${
                      showResult
                        ? option.correct
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : selectedAnswer === option && !option.correct
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-gray-100 border-gray-300'
                        : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              {showResult && (
                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>Correct answers: {currentQuestion.options.filter(opt => opt.correct).map(opt => opt.text).join(', ')}</p>
                </div>
              )}
            </div>
          )}

          {currentQuestion.type === 'true-false' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">{currentQuestion.content}</h2>
              <div className="space-y-3 max-w-md mx-auto">
                <button
                  onClick={() => handleAnswer(true, currentQuestion.correctAnswer === true)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-2xl border-2 transition-all font-semibold ${
                    showResult
                      ? currentQuestion.correctAnswer === true
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : selectedAnswer === true
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 border-gray-300'
                      : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  TRUE
                </button>
                <button
                  onClick={() => handleAnswer(false, currentQuestion.correctAnswer === false)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-2xl border-2 transition-all font-semibold ${
                    showResult
                      ? currentQuestion.correctAnswer === false
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : selectedAnswer === false
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 border-gray-300'
                      : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  FALSE
                </button>
              </div>
            </div>
          )}

          {currentQuestion.type === 'fill-blank' && (
            <div>
              {currentQuestion.image && (
                <div className="text-6xl text-center mb-4">{currentQuestion.image}</div>
              )}
              <h2 className="text-2xl font-bold mb-6 text-center">{currentQuestion.content}</h2>
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your answer..."
                  disabled={showResult}
                  className="w-full p-4 text-xl border-2 border-gray-300 rounded-2xl text-center font-semibold focus:border-green-500 focus:outline-none"
                />
                {!showResult && (
                  <button
                    onClick={checkFillBlank}
                    disabled={!userInput.trim()}
                    className="w-full mt-4 bg-green-500 text-white p-4 rounded-2xl font-bold text-lg hover:bg-green-600 transition-colors disabled:bg-gray-300"
                  >
                    Check Answer
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Result Feedback */}
          {showResult && (
            <div className="fixed inset-x-0 bottom-0 bg-white border-t-2 p-6">
              <div className="max-w-md mx-auto">
                <div className={`flex items-center gap-3 mb-4 ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isCorrect ? (
                    <Check className="w-8 h-8 bg-green-500 text-white rounded-full p-1" />
                  ) : (
                    <X className="w-8 h-8 bg-red-500 text-white rounded-full p-1" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold">
                      {isCorrect ? 'Correct!' : 'Oops! Try again'}
                    </h3>
                    {isCorrect && <p className="text-sm">+10 seeds, +5 stars</p>}
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-green-500 text-white p-4 rounded-2xl font-bold text-lg hover:bg-green-600 transition-colors"
                >
                  {isCorrect ? 'Continue' : 'Try Again'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Energy refill effect
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => Math.min(25, prev + 1));
    }, 30000); // Refill 1 energy every 30 seconds for demo

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {currentScreen === 'home' ? renderHomeScreen() : renderLessonScreen()}
    </div>
  );
};

export default PlantLearningApp;
import React, { useState } from 'react';
import { X, RefreshCw, Check, AlertCircle, HelpCircle } from 'lucide-react';

interface GamesModalProps {
  initialGame?: 'wordle' | 'connections' | 'spelling-bee' | 'mini';
  onClose: () => void;
}

export const GamesModal: React.FC<GamesModalProps> = ({ initialGame = 'wordle', onClose }) => {
  const [activeTab, setActiveTab] = useState<'wordle' | 'connections' | 'spelling-bee' | 'mini'>(initialGame);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl border border-neutral-300 flex flex-col overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-base tracking-tight text-neutral-900 font-nyt-sans">NYT Games</span>
            <span className="text-xs bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded font-mono font-bold">Daily Mini</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-neutral-500 hover:text-neutral-900 rounded hover:bg-neutral-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-4 border-b border-neutral-200 text-xs font-semibold text-center bg-white">
          <button
            onClick={() => setActiveTab('wordle')}
            className={`py-2.5 flex items-center justify-center space-x-1.5 border-b-2 transition ${
              activeTab === 'wordle'
                ? 'border-neutral-900 text-neutral-900 bg-neutral-50'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <span className="w-4 h-4 bg-[#6aaa64] text-white rounded text-[10px] font-bold inline-flex items-center justify-center">W</span>
            <span>Wordle</span>
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`py-2.5 flex items-center justify-center space-x-1.5 border-b-2 transition ${
              activeTab === 'connections'
                ? 'border-neutral-900 text-neutral-900 bg-neutral-50'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <span className="w-4 h-4 bg-[#ba8c63] text-white rounded text-[10px] font-bold inline-flex items-center justify-center">C</span>
            <span>Connect</span>
          </button>
          <button
            onClick={() => setActiveTab('spelling-bee')}
            className={`py-2.5 flex items-center justify-center space-x-1.5 border-b-2 transition ${
              activeTab === 'spelling-bee'
                ? 'border-neutral-900 text-neutral-900 bg-neutral-50'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <span className="w-4 h-4 bg-[#f7da21] text-neutral-900 rounded text-[10px] inline-flex items-center justify-center">🐝</span>
            <span>Bee</span>
          </button>
          <button
            onClick={() => setActiveTab('mini')}
            className={`py-2.5 flex items-center justify-center space-x-1.5 border-b-2 transition ${
              activeTab === 'mini'
                ? 'border-neutral-900 text-neutral-900 bg-neutral-50'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <span className="w-4 h-4 bg-black text-white rounded text-[9px] font-bold inline-flex items-center justify-center">M</span>
            <span>Crossword</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {activeTab === 'wordle' && <WordleGame />}
          {activeTab === 'connections' && <ConnectionsGame />}
          {activeTab === 'spelling-bee' && <SpellingBeeGame />}
          {activeTab === 'mini' && <MiniCrosswordGame />}
        </div>
      </div>
    </div>
  );
};

/* --- 1. WORDLE MINI --- */
function WordleGame() {
  const TARGET_WORD = 'TIMES';
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const handleKey = (char: string) => {
    if (isGameOver) return;
    if (char === 'ENTER') {
      if (currentGuess.length !== 5) {
        setMessage('Word must be 5 letters');
        setTimeout(() => setMessage(''), 1800);
        return;
      }
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      if (currentGuess === TARGET_WORD) {
        setMessage('Splendid! You guessed today’s word!');
        setIsGameOver(true);
      } else if (newGuesses.length >= 6) {
        setMessage(`Game Over. The word was ${TARGET_WORD}`);
        setIsGameOver(true);
      }
      setCurrentGuess('');
    } else if (char === 'DEL') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => prev + char);
      }
    }
  };

  const getTileStyle = (rowIndex: number, colIndex: number) => {
    const guess = guesses[rowIndex];
    if (!guess) {
      if (rowIndex === guesses.length) {
        const letter = currentGuess[colIndex];
        return letter ? 'border-neutral-800 text-neutral-900' : 'border-neutral-300 text-neutral-900';
      }
      return 'border-neutral-200 text-neutral-400';
    }

    const letter = guess[colIndex];
    if (letter === TARGET_WORD[colIndex]) {
      return 'bg-[#6aaa64] border-[#6aaa64] text-white font-bold';
    } else if (TARGET_WORD.includes(letter)) {
      return 'bg-[#c9b458] border-[#c9b458] text-white font-bold';
    } else {
      return 'bg-[#787c7e] border-[#787c7e] text-white font-bold';
    }
  };

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setMessage('');
    setIsGameOver(false);
  };

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-center justify-between w-full max-w-xs mb-3">
        <h3 className="font-bold text-sm tracking-wide font-nyt-headline uppercase">Wordle #1,215</h3>
        <button onClick={resetGame} className="text-xs text-neutral-500 hover:text-black flex items-center space-x-1">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {message && (
        <div className="mb-2 px-3 py-1 bg-black text-white text-xs font-bold rounded animate-bounce">
          {message}
        </div>
      )}

      {/* 6 Rows Grid */}
      <div className="grid grid-rows-6 gap-1.5 w-60 mb-4">
        {Array.from({ length: 6 }).map((_, rIdx) => (
          <div key={rIdx} className="grid grid-cols-5 gap-1.5 h-10">
            {Array.from({ length: 5 }).map((_, cIdx) => {
              const letter =
                guesses[rIdx]?.[cIdx] ||
                (rIdx === guesses.length ? currentGuess[cIdx] : '');
              return (
                <div
                  key={cIdx}
                  className={`border-2 flex items-center justify-center text-lg font-bold uppercase transition-colors duration-300 ${getTileStyle(
                    rIdx,
                    cIdx
                  )}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Mini Keyboard */}
      <div className="w-full max-w-xs space-y-1">
        {['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center space-x-1">
            {rowIdx === 2 && (
              <button
                onClick={() => handleKey('ENTER')}
                className="px-2 py-2 bg-neutral-200 hover:bg-neutral-300 text-[11px] font-bold rounded text-neutral-800"
              >
                ENTER
              </button>
            )}
            {row.split('').map(char => (
              <button
                key={char}
                onClick={() => handleKey(char)}
                className="w-7 h-9 bg-neutral-200 hover:bg-neutral-300 text-xs font-bold rounded text-neutral-900 flex items-center justify-center transition active:bg-neutral-400"
              >
                {char}
              </button>
            ))}
            {rowIdx === 2 && (
              <button
                onClick={() => handleKey('DEL')}
                className="px-2 py-2 bg-neutral-200 hover:bg-neutral-300 text-[11px] font-bold rounded text-neutral-800"
              >
                DEL
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 2. CONNECTIONS MINI --- */
interface Category {
  name: string;
  color: string;
  words: string[];
}

const CONNECTIONS_CATEGORIES: Category[] = [
  { name: 'NEWSPAPER SECTIONS', color: 'bg-[#fbd38d]', words: ['METRO', 'STYLE', 'OPINION', 'BUSINESS'] },
  { name: 'THINGS ASSOCIATED WITH COFFEE', color: 'bg-[#a3e635]', words: ['ESPRESSO', 'ROAST', 'BEANS', 'FILTER'] },
  { name: 'WORDS MEANING "BRILLIANT"', color: 'bg-[#67e8f9]', words: ['LUMINOUS', 'RADIANT', 'CLEVER', 'SUPERB'] },
  { name: 'PALINDROMES', color: 'bg-[#d8b4fe]', words: ['RADAR', 'KAYAK', 'LEVEL', 'REVIVER'] },
];

function ConnectionsGame() {
  const [solvedCategories, setSolvedCategories] = useState<Category[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [mistakesLeft, setMistakesLeft] = useState(4);
  const [statusMessage, setStatusMessage] = useState('');

  // Unsolved words
  const remainingWords = CONNECTIONS_CATEGORIES
    .filter(cat => !solvedCategories.find(s => s.name === cat.name))
    .flatMap(c => c.words);

  const toggleSelect = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      if (selectedWords.length < 4) {
        setSelectedWords([...selectedWords, word]);
      }
    }
  };

  const handleShuffle = () => {
    // Just deselect
    setSelectedWords([]);
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) return;

    const matched = CONNECTIONS_CATEGORIES.find(cat =>
      cat.words.every(w => selectedWords.includes(w))
    );

    if (matched) {
      setSolvedCategories(prev => [...prev, matched]);
      setSelectedWords([]);
      setStatusMessage(`Found: ${matched.name}!`);
      setTimeout(() => setStatusMessage(''), 2000);
    } else {
      setMistakesLeft(prev => Math.max(0, prev - 1));
      setStatusMessage('Incorrect combination. Try again!');
      setTimeout(() => setStatusMessage(''), 1800);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm tracking-wide uppercase font-nyt-headline">Connections</h3>
        <span className="text-xs text-neutral-500">Create 4 groups of 4</span>
      </div>

      {statusMessage && (
        <div className="mb-2 px-3 py-1 bg-neutral-900 text-white text-xs font-semibold rounded">
          {statusMessage}
        </div>
      )}

      {/* Solved Rows */}
      <div className="w-full space-y-2 mb-2">
        {solvedCategories.map(cat => (
          <div key={cat.name} className={`p-3 rounded text-center ${cat.color} text-neutral-950 shadow-xs`}>
            <div className="font-bold text-xs uppercase tracking-wider">{cat.name}</div>
            <div className="text-xs mt-0.5">{cat.words.join(', ')}</div>
          </div>
        ))}
      </div>

      {/* Words Grid */}
      {remainingWords.length > 0 ? (
        <div className="grid grid-cols-4 gap-2 w-full mb-4">
          {remainingWords.map(word => {
            const isSelected = selectedWords.includes(word);
            return (
              <button
                key={word}
                onClick={() => toggleSelect(word)}
                className={`py-3 px-1 rounded text-xs font-bold uppercase transition flex items-center justify-center ${
                  isSelected
                    ? 'bg-neutral-800 text-white scale-98 shadow-inner'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded text-center w-full my-3">
          <p className="font-bold text-sm">Bravo! You solved all categories!</p>
        </div>
      )}

      {/* Mistakes Indicator & Controls */}
      <div className="flex items-center space-x-2 text-xs text-neutral-600 mb-4">
        <span>Mistakes remaining:</span>
        <div className="flex space-x-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${
                i < mistakesLeft ? 'bg-neutral-700' : 'bg-neutral-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleShuffle}
          className="px-4 py-1.5 border border-neutral-400 rounded-full text-xs font-semibold hover:border-black"
        >
          Deselect All
        </button>
        <button
          onClick={handleSubmit}
          disabled={selectedWords.length !== 4}
          className={`px-5 py-1.5 rounded-full text-xs font-semibold ${
            selectedWords.length === 4
              ? 'bg-neutral-900 text-white hover:bg-black'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

/* --- 3. SPELLING BEE MINI --- */
function SpellingBeeGame() {
  const CENTER_LETTER = 'N';
  const OUTER_LETTERS = ['E', 'W', 'S', 'P', 'A', 'R'];
  const VALID_WORDS = ['NEWSPAPER', 'NEWS', 'PAWN', 'SPAWN', 'WARN', 'WASP', 'SEWN', 'PRAWN', 'PANE', 'NEAP', 'REAP'];

  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [beeMessage, setBeeMessage] = useState('');

  const handleLetterClick = (letter: string) => {
    setCurrentWord(prev => prev + letter);
  };

  const handleBackspace = () => {
    setCurrentWord(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentWord.length < 4) {
      setBeeMessage('Too short (min 4 letters)');
      setTimeout(() => setBeeMessage(''), 1500);
      return;
    }
    if (!currentWord.includes(CENTER_LETTER)) {
      setBeeMessage(`Must include center letter (${CENTER_LETTER})`);
      setTimeout(() => setBeeMessage(''), 1500);
      return;
    }
    if (foundWords.includes(currentWord)) {
      setBeeMessage('Already found!');
      setTimeout(() => setBeeMessage(''), 1500);
      return;
    }
    if (VALID_WORDS.includes(currentWord)) {
      setFoundWords(prev => [...prev, currentWord]);
      setBeeMessage(`Nice! +${currentWord.length} points`);
      setTimeout(() => setBeeMessage(''), 1500);
      setCurrentWord('');
    } else {
      setBeeMessage('Word not in dictionary');
      setTimeout(() => setBeeMessage(''), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm tracking-wide uppercase font-nyt-headline">Spelling Bee</h3>
        <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
          Found: {foundWords.length} words
        </span>
      </div>

      {/* Word Entry Display */}
      <div className="h-10 flex items-center justify-center font-bold text-xl uppercase tracking-widest text-neutral-900 mb-2">
        {currentWord || <span className="text-neutral-300 font-normal">Type or click letters...</span>}
      </div>

      {beeMessage && (
        <div className="mb-2 text-xs font-semibold text-neutral-800 bg-amber-200 px-3 py-1 rounded">
          {beeMessage}
        </div>
      )}

      {/* Honeycomb Hive UI */}
      <div className="relative w-48 h-48 my-2">
        {/* Center Button */}
        <button
          onClick={() => handleLetterClick(CENTER_LETTER)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#f7da21] hover:bg-[#e6c810] text-black font-extrabold text-xl rounded-full shadow-md flex items-center justify-center transition active:scale-95"
        >
          {CENTER_LETTER}
        </button>

        {/* Outer Hexagon Buttons around center */}
        {OUTER_LETTERS.map((letter, idx) => {
          const angles = [270, 330, 30, 90, 150, 210];
          const rad = (angles[idx] * Math.PI) / 180;
          const radius = 62;
          const x = 96 + radius * Math.cos(rad) - 24;
          const y = 96 + radius * Math.sin(rad) - 24;

          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              style={{ left: `${x}px`, top: `${y}px` }}
              className="absolute w-12 h-12 bg-neutral-200 hover:bg-neutral-300 text-neutral-900 font-bold text-lg rounded-full shadow-sm flex items-center justify-center transition active:scale-95"
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex space-x-2 mt-4">
        <button
          onClick={handleBackspace}
          className="px-4 py-1.5 border border-neutral-300 rounded-full text-xs font-semibold hover:border-black"
        >
          Delete
        </button>
        <button
          onClick={() => setCurrentWord('')}
          className="px-4 py-1.5 border border-neutral-300 rounded-full text-xs font-semibold hover:border-black"
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          className="px-5 py-1.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-black"
        >
          Enter
        </button>
      </div>

      {/* Found list */}
      {foundWords.length > 0 && (
        <div className="mt-4 w-full bg-neutral-50 p-2.5 rounded border border-neutral-200 text-xs">
          <span className="font-semibold text-neutral-600 block mb-1">Found Words:</span>
          <div className="flex flex-wrap gap-1.5">
            {foundWords.map(w => (
              <span key={w} className="bg-white px-2 py-0.5 border border-neutral-200 rounded font-mono font-medium">
                {w}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* --- 4. MINI CROSSWORD 5x5 --- */
function MiniCrosswordGame() {
  const SOLUTION = [
    ['P', 'A', 'P', 'E', 'R'],
    ['A', 'L', 'O', 'N', 'E'],
    ['S', 'P', 'O', 'R', 'T'],
    ['T', 'H', 'I', 'N', 'K'],
    ['A', 'A', 'L', 'S', 'O'],
  ];

  const [grid, setGrid] = useState<string[][]>([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);

  const [selectedCell, setSelectedCell] = useState<[number, number]>([0, 0]);
  const [isComplete, setIsComplete] = useState(false);

  const cluesAcross = [
    { num: 1, text: 'The Times is printed on this' },
    { num: 4, text: 'Solo or by oneself' },
    { num: 5, text: 'Athletics, e.g.' },
    { num: 6, text: 'Use one’s brain' },
    { num: 7, text: 'In addition' },
  ];

  const cluesDown = [
    { num: 1, text: 'Spaghetti or penne' },
    { num: 2, text: 'Alpha and beta' },
    { num: 3, text: 'Water swimming hole' },
    { num: 4, text: 'Historic era' },
    { num: 5, text: 'Competitor in athletic games' },
  ];

  const handleCellChange = (r: number, c: number, char: string) => {
    if (char.length > 1) return;
    const newGrid = grid.map((row, rI) =>
      row.map((val, cI) => (rI === r && cI === c ? char.toUpperCase() : val))
    );
    setGrid(newGrid);

    // Check completion
    const allFilled = newGrid.every(row => row.every(cell => cell.length === 1));
    if (allFilled) {
      const isCorrect = newGrid.every((row, rI) =>
        row.every((cell, cI) => cell === SOLUTION[rI][cI])
      );
      if (isCorrect) setIsComplete(true);
    }
  };

  const handleFillDemo = () => {
    setGrid(SOLUTION);
    setIsComplete(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm tracking-wide uppercase font-nyt-headline">The Daily Mini Crossword</h3>
        <button onClick={handleFillDemo} className="text-xs text-[#326891] hover:underline font-semibold">
          Reveal Answers
        </button>
      </div>

      {isComplete && (
        <div className="mb-3 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-md shadow flex items-center space-x-1.5">
          <Check className="w-4 h-4" />
          <span>Congratulations! You solved today’s Mini Crossword!</span>
        </div>
      )}

      {/* 5x5 Grid */}
      <div className="grid grid-cols-5 gap-1 w-52 h-52 bg-neutral-900 p-1 rounded shadow mb-4">
        {grid.map((row, r) =>
          row.map((val, c) => {
            const isSelected = selectedCell[0] === r && selectedCell[1] === c;
            return (
              <div
                key={`${r}-${c}`}
                onClick={() => setSelectedCell([r, c])}
                className={`relative bg-white flex items-center justify-center font-bold text-base select-none cursor-pointer ${
                  isSelected ? 'bg-amber-100 ring-2 ring-amber-500' : 'hover:bg-neutral-100'
                }`}
              >
                {/* Clue numbering on top-left of first cells */}
                {(r === 0 || c === 0) && (
                  <span className="absolute top-0.5 left-0.5 text-[9px] text-neutral-400 font-sans leading-none">
                    {r * 5 + c + 1}
                  </span>
                )}
                <input
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={e => handleCellChange(r, c, e.target.value)}
                  className="w-full h-full text-center font-bold uppercase bg-transparent outline-none cursor-pointer"
                />
              </div>
            );
          })
        )}
      </div>

      {/* Clues */}
      <div className="grid grid-cols-2 gap-3 w-full text-xs border-t border-neutral-200 pt-3">
        <div>
          <h4 className="font-bold uppercase tracking-wider text-neutral-800 mb-1">Across</h4>
          <ul className="space-y-1 text-neutral-600">
            {cluesAcross.map(clue => (
              <li key={clue.num} className="leading-tight">
                <span className="font-bold text-neutral-900">{clue.num}.</span> {clue.text}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold uppercase tracking-wider text-neutral-800 mb-1">Down</h4>
          <ul className="space-y-1 text-neutral-600">
            {cluesDown.map(clue => (
              <li key={clue.num} className="leading-tight">
                <span className="font-bold text-neutral-900">{clue.num}.</span> {clue.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

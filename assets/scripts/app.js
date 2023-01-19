const attackValue = 10;
const strongAttackValue = 17;
const monsterAttackValue = 14;
const HEAL_VALUE = 20;

const ATTACK_MODE = "Attack";
const STRONG_ATTACK_MODE = "Strong Attack";

// Declared consts for writeToLog function
const ATTACK_LOG = "PLAYER_ATTACK";
const STRONG_ATTACK_LOG = "STRONG_ATTACK";
const MONSTER_ATTACK_LOG = "MONSTER_ATTACK";
const HEAL_LOG = "HEAL_LOG";
const LOG_GAME_OVER = "GAME_OVER";

let battleLog = [];

function getMaxLifeValues() {
  const enteredValue = prompt("Enter the Maximum Points", "");

  const parsedValue = parseInt(enteredValue);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: "Invalid user input, not a number" };
  }
  return parsedValue;
}

let chosenMaxLife;

try {
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  alert("You entered the wrong value so, default max values assigned as 100");
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function attackMonster(mode) {
  const maxDamage = mode === ATTACK_MODE ? attackValue : strongAttackValue;
  const logEvent = mode === ATTACK_MODE ? ATTACK_LOG : STRONG_ATTACK_LOG;

  //Above condition wrote using if else
  /* if (mode === ATTACK_MODE) {
    maxDamage = attackValue;
    logEvent = ATTACK_LOG;
  } else if (mode === STRONG_ATTACK_MODE) {
    maxDamage = strongAttackValue;
    logEvent = STRONG_ATTACK_LOG
  } */

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

function attackfun() {
  attackMonster(ATTACK_MODE);
}

function strongAttackfun() {
  attackMonster(STRONG_ATTACK_MODE);
}

//function to heal the palyer
function healPlayer() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health.");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }

  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(HEAL_LOG, healValue, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

// This function used to print all the events
function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  switch (event) {
    case ATTACK_LOG:
      logEntry.target = "Monster";
      break;
    case STRONG_ATTACK_LOG:
      logEntry = {
        event: event,
        value: value,
        target: "Monster",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
    case MONSTER_ATTACK_LOG:
      logEntry = {
        event: event,
        value: value,
        target: "Player",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case HEAL_LOG:
      logEntry = {
        event: event,
        value: value,
        target: "Player",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_GAME_OVER:
      logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    default:
      logEntry = {};
  }
  battleLog.push(logEntry);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(monsterAttackValue);
  currentPlayerHealth -= playerDamage;

  writeToLog(
    STRONG_ATTACK_LOG,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You used your precious bonus life once");
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");

    writeToLog(
      LOG_GAME_OVER,
      "Player won",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");

    writeToLog(
      LOG_GAME_OVER,
      "Player Lost",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("You have a draw!");

    writeToLog(
      LOG_GAME_OVER,
      "Match Draw",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

//reset fun to reset all the values after a event is completed
function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function printLog() {
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);
  // }
  let i = 0;
  for (const logEntry of battleLog) {
    console.log(battleLog);
  }
  i++;
}

attackBtn.addEventListener("click", attackfun);
strongAttackBtn.addEventListener("click", strongAttackfun);
healBtn.addEventListener("click", healPlayer);
// logBtn.addEventListener("click", printLog);

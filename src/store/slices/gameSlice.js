/* eslint-disable no-param-reassign */
import { createSlice, current } from "@reduxjs/toolkit";

const defaultState = {
  inProgress: false,
  users: [],
  isGameOver: false,
  phase: "day",
  phaseCount: 0,
  rolesetOptions: [],
  selectedRoleset: null,
  leader: null,
  views: {},
  gameOverDetails: {
    winner: "Good",
    roles: [
      {
        id: "1d91a790-2197-443f-aadb-cf8e38aaa02b",
        name: "Villager 2",
        role: {
          name: "Villager",
          description: "You have no special powers. Kill the wolves before they kill you!",
          team: "Good",
          alive: false,
          night_action: 0,
        },
      },
      {
        id: "2573b3e3-1724-421a-83e8-8f3669a3ef60",
        name: "Hunter",
        role: {
          name: "Hunter",
          description: "Evil can't win unless you're dead. So... don't do that.",
          team: "Good",
          alive: true,
          night_action: 0,
        },
      },
      {
        id: "56d00cf5-25a3-4640-9752-0110981bb5d8",
        name: "Villager 3",
        role: {
          name: "Villager",
          description: "You have no special powers. Kill the wolves before they kill you!",
          team: "Good",
          alive: false,
          night_action: 0,
        },
      },
      {
        id: "c4953c8c-cb3a-4c8e-a9e1-9776bc3d192d",
        name: "Wolf 2",
        role: {
          name: "Werewolf",
          description: "Blend in during the day. At night... you feed.",
          team: "Evil",
          alive: true,
          night_action: 34,
        },
      },
      {
        id: "aec7aecf-7324-41ff-a48d-23e8bd9cde27",
        name: "Villager 4",
        role: {
          name: "Villager",
          description: "You have no special powers. Kill the wolves before they kill you!",
          team: "Good",
          alive: false,
          night_action: 0,
        },
      },
      {
        id: "1869be0d-3ebc-4be4-b61b-a28fbbb4b612",
        name: "Seer",
        role: {
          name: "Seer",
          description:
            "Each night you choose someone to view, and are told if they're a Werewolf. At the start of the game you're given a random player who is not a Wolf.",
          team: "Good",
          alive: false,
          night_action: 17,
        },
      },
      {
        id: "736c40c1-b89e-42b1-a78e-7307bdb49d85",
        name: "Wolf 1",
        role: {
          name: "Werewolf",
          description: "Blend in during the day. At night... you feed.",
          team: "Evil",
          alive: false,
          night_action: 34,
        },
      },
      {
        id: "4a02fbdb-2729-4c2b-8e24-8eeb2e6790e5",
        name: "Villager 1",
        role: {
          name: "Villager",
          description: "You have no special powers. Kill the wolves before they kill you!",
          team: "Good",
          alive: false,
          night_action: 0,
        },
      },
      {
        id: "8bc28232-4a48-4f92-939f-21099f2e030d",
        name: "Sorcerer",
        role: {
          name: "Sorcerer",
          description:
            "You don't know the wolf, but are evil. Each night you view a player and find out if they're the seer. Kill that seer.",
          team: "Evil",
          alive: false,
          night_action: 20,
        },
      },
      {
        id: "c1b67df5-ab57-4a37-baa3-14f71ad72086",
        name: "Villager 5",
        role: {
          name: "Villager",
          description: "You have no special powers. Kill the wolves before they kill you!",
          team: "Good",
          alive: false,
          night_action: 0,
        },
      },
      {
        id: "7a2e7bcf-ca11-46fe-a26d-08d51ef6b469",
        name: "Villager 6",
        role: {
          name: "Villager",
          description: "You have no special powers. Kill the wolves before they kill you!",
          team: "Good",
          alive: false,
          night_action: 0,
        },
      },
    ],
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState: defaultState,
  reducers: {
    // actions
    setGameInProgress: (state) => {
      state.inProgress = true;
    },
    resetGame: () => defaultState,
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
    setRoles: (state, action) => {
      state.rolesetOptions = action.payload.rolesetOptions;
    },
    setSelectedRoleset: (state, action) => {
      state.selectedRoleset = action.payload;
    },
    setLeader: (state, action) => {
      state.leader = action.payload;
    },
    changePhaseDetails: (state, action) => {
      console.log("changing phase details", action.payload);
      state.phase = action.payload.phase;
      state.phaseCount = action.payload.count;
      state.inProgress = true;
    },
    setUserTallies: (state, action) => {
      const newData = action.payload.list;
      const updatedUsers = newData.map((user) => {
        const { id, name } = user.player;
        const { votes } = user;
        return {
          id,
          name,
          votes,
        };
      });
      state.users = updatedUsers;
    },
    addView: (state, action) => {
      console.log({ action });
      const { Player, Attribute, Role, GamePhase, Hit } = action.payload;
      console.log({ Player, Attribute, Role, GamePhase, Hit, state });
      const currState = current(state);
      console.log({ currState });
      // game phase already exists
      if (currState.views[`${GamePhase}`]) {
        state.views[`${GamePhase}`].push({ Player, Attribute, Role, Hit });
      }
      // game phase doesn't exist yet
      else {
        state.views[`${GamePhase}`] = [{ Player, Attribute, Role, Hit }];
      }
    },
    setGameOver: (state, action) => {
      state.gameOverDetails = action.payload;
    },
  },
});

export const {
  setGameInProgress,
  resetGame,
  setUsers,
  setRoles,
  setSelectedRoleset,
  setLeader,
  changePhaseDetails,
  setUserTallies,
  addView,
  setGameOver,
} = gameSlice.actions;

export default gameSlice.reducer;

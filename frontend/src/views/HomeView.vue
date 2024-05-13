<script setup lang="ts">
import PlayerChip from '@/components/PlayerChip.vue';
import { reactive, ref, type Ref } from 'vue'


interface Player {
  id: number;
  title: string;
}

interface Teams {
  team0: Player[];
  team1: Player[];
}

let Players = ref<Player[]>([]);
let nick = ref<string>('');
let nextID = 0;


let teams = reactive<Teams>({
  team0: [],
  team1: []
});

const AddChip = () =>
{
  Players.value.push({
    id: nextID++,
    title: nick.value
  });
  nick.value = '';
}

const RandomizeTeams = () => 
{
  teams.team0 = [];
  teams.team1 = [];

  let SortedPlayers = Players.value;
  SortedPlayers.sort((a, b) => 0.5 - Math.random());

  SortedPlayers.forEach((element) => {
    let randomTeam = Math.round(Math.random());
    if ((randomTeam && teams.team1.length < 5) || teams.team0.length >= 5) {
      teams.team1.push(element);
    } else {
      teams.team0.push(element);
    }
  });
}

const startDrag = (event: DragEvent, index: number) => {
  const item = Players.value[index];

  if (item) {
    event.dataTransfer!.dropEffect = 'move';
    event.dataTransfer!.effectAllowed = 'move';
    event.dataTransfer!.setData('PlayerIndex', index.toString());
    console.log("startDrag - PlayerIndex set to:", index);
  } else {
    console.error("startDrag - Invalid item at index:", index);
  }
};

const onDrop = (event: DragEvent, team: number, index: number) => {
  const PlayerIndex = event.dataTransfer!.getData('PlayerIndex');
  const playerIndexNum = Number(PlayerIndex);

  if (isNaN(playerIndexNum) || playerIndexNum < 0 || playerIndexNum >= Players.value.length) {
    console.error("onDrop - Invalid PlayerIndex:", PlayerIndex);
    return;
  }

  const data = Players.value[playerIndexNum];

  if (!data) {
    console.error("onDrop - Invalid player data at index:", playerIndexNum);
    return;
  }

  const existsTeam0 = teams.team0.find((e) => e && e.title === data.title);
  const existsTeam1 = teams.team1.find((e) => e && e.title === data.title);

  if (team) {
    if (existsTeam0) {
      let tmpIndex = teams.team0.indexOf(existsTeam0);
      teams.team0.splice(tmpIndex, 1);
    } else if (existsTeam1) {
      let tmpIndex = teams.team1.indexOf(existsTeam1);
      teams.team1.splice(tmpIndex, 1);
    }
    teams.team1[index] = data;
  } else {
    if (existsTeam0) {
      let tmpIndex = teams.team0.indexOf(existsTeam0);
      teams.team0.splice(tmpIndex, 1);
    } else if (existsTeam1) {
      let tmpIndex = teams.team1.indexOf(existsTeam1);
      teams.team1.splice(tmpIndex, 1);
    }
    teams.team0[index] = data;
  }
  console.log("onDrop - Updated teams:", teams);
};

</script>

<template>

  <main>
    <div class="d-flex">
      <v-text-field v-model="nick" :width="250" label="Nick" variant="underlined"></v-text-field>
      <v-btn  @click="AddChip" class="align-self-center ma-4" color="teal-accent-4" density="comfortable">
      Dodaj
      </v-btn>
    </div>
    <div>
      <h5>Liczba graczy: {{ Players.length }}</h5>
    </div>
    <div id="PlayersChips">
        <PlayerChip
        v-for="(player, index) in Players"
        :key="player.id"
        :title="player.title"
        :index="index"
        :startdrag="startDrag"
        @remove="Players.splice(index, 1)"
        />
    </div>

  </main>

  <div>
    <v-container class="mt-4 ml-0 pl-0">
      <div>
        <v-btn  @click="RandomizeTeams" class="align-self-center ma-2" color="red">
        Losuj <v-icon class="ml-2" icon="mdi-shuffle-variant"></v-icon>
        </v-btn>
      </div>
      <div class="mt-16">
        <v-row class="mx-6" no-gutters >
          <v-col cols="4">
            <h1 class="t0">TEAM 1</h1>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4">
            <h1 class="t1">TEAM 2</h1>
          </v-col>
        </v-row>
        <v-row class="mx-6 player{{ n }}" no-gutters v-for="n in 5" :key="n">
            <v-col cols="4">
              <v-sheet
                min-height="80"
                draggable="true"
                v-bind:rounded="true"
                class="ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_0"
                @dragstart="startDrag($event, teams.team0[n-1] ? teams.team0[n-1].id : -1)"
                @drop="onDrop($event, 0, n-1)"
                @dragenter.prevent
                @dragover.prevent
              >
                <div v-if="teams.team0[n-1]" class="playerDiv">
                  <v-avatar size="32" start color="surface-variant">
                    <v-icon icon="mdi-account-circle"></v-icon>
                  </v-avatar>
                  {{ teams.team0[n-1].title }}
                  <div class="remove_team_card" width="100%" d-flex justify-end>
                    <v-btn float-right icon="mdi-lock-open-outline" color="transparent" size="27"></v-btn>
                    <v-btn float-right icon="mdi-close-thick" color="transparent" size="27"></v-btn>
                  </div>
                </div>
                <div class="ml-1" v-else>
                  Pusty
                </div>
              </v-sheet>
            </v-col>

            <v-spacer></v-spacer>

            <v-col cols="4">
              <v-sheet
                min-height="80"
                draggable="true"
                v-bind:rounded="true"
                class="ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_1"
                @dragstart="startDrag($event, teams.team1[n-1] ? teams.team1[n-1].id : -1)"
                @drop="onDrop($event, 1, n-1)"
                @dragenter.prevent
                @dragover.prevent
              >
                <div v-if="teams.team1[n-1]" class="playerDiv">
                  <v-avatar size="32" start color="surface-variant">
                    <v-icon icon="mdi-account-circle"></v-icon>
                  </v-avatar>
                  {{ teams.team1[n-1].title }}
                  <div class="remove_team_card" width="100%" d-flex justify-end>
                    <v-btn float-right icon="mdi-lock-open-outline" color="transparent" size="27"></v-btn>
                    <v-btn float-right icon="mdi-close-thick" color="transparent" size="27"></v-btn>
                  </div>
                </div>
                <div class="ml-1" v-else>
                  Pusty
                </div>
              </v-sheet>
            </v-col>
        </v-row>
      </div>
    </v-container>
  </div>

</template>

<style scoped>
.remove_team_card
{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.team_player
{
  display: flex;
  justify-content: flex-start;
  border: 4px solid transparent;

}
.playerDiv{
  width: 100%;
  align-items: center;
  display: flex;
}
.team_1:hover
{
  border: 4px solid rgb(0, 191, 165);
}
.team_0:hover
{
  border: 4px solid rgb(244, 67, 54)
}

.t1{
  color: rgb(0, 191, 165);

}

.t0{
 color: rgb(244, 67, 54)
}

.t1, .t0{
    border-bottom: 1px solid rgb(66, 66, 66);
    padding-bottom: 3px;
}

</style>



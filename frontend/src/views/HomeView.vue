<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue'
import { el } from 'vuetify/locale';
import PlayerChip from '../components/PlayerChip.vue';


interface Player {
  id: number;
  title: string;
  locked: boolean;
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
    title: nick.value,
    locked: false,
  });
  nick.value = '';
}

const lockPlayer = (playerId :number) => {
  console.log("Player locked: "+ playerId);
  if(playerId >= 0)
  {
    let data = Players.value.find((e) => e && e.id === playerId);
    console.log("Player locked data: ", data);

    if(data)
    {
      data.locked  = !data.locked;
    }
  }
};

const chipRemove = (index :number, title :string) => {
  
  Players.value.splice(index, 1);

  let existsTeam0 = teams.team0.findIndex((e) => e && e.title === title);
  let existsTeam1 = teams.team1.findIndex((e) => e && e.title === title);

  if (existsTeam0 >= 0) {
      delete teams.team0[existsTeam0];
  } 
  if (existsTeam1 >= 0) {
      delete teams.team1[existsTeam1];
  }
}


const ResetTeam = (teamSlot :any) =>
{

  if(teamSlot && teamSlot.locked) return true;

  return false;
}

const RandomizeTeams = () => 
{
  teams.team0 = teams.team0.filter(ResetTeam);
  teams.team1 = teams.team1.filter(ResetTeam);


  let SortedPlayers = Players.value
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
   
  SortedPlayers.forEach((element) => {

    let existsTeam0 = teams.team0.find((e) => e && e.title === element.title);
    let existsTeam1 = teams.team1.find((e) => e && e.title === element.title);

    if(!existsTeam0 && !existsTeam1)
    {
      let randomTeam = Math.round(Math.random());
      if ((randomTeam && teams.team1.length < 5) || teams.team0.length >= 5) {
        teams.team1.push(element);
      } else {
        teams.team0.push(element);
      }
    }

  });
}


const startDrag = (event: DragEvent, index: number, slotindex: number = 0,team :number = -1) => {
  
  const item = Players.value.find((e) => e && e.id === index);

  if (item) {
    event.dataTransfer!.dropEffect = 'move';
    event.dataTransfer!.effectAllowed = 'move';
    event.dataTransfer!.setData('PlayerIndex', index.toString());
    event.dataTransfer!.setData('SlotIndex', slotindex.toString());
    event.dataTransfer!.setData('SlotTeam', team.toString());
  } else {
    console.error("startDrag - Invalid item at index:", item);
    return;
  }
};

const onDrop = (event: DragEvent, team: number, index: number) => {
  let PlayerIndex = event.dataTransfer!.getData('PlayerIndex');
  let SlotIndex = Number(event.dataTransfer!.getData('SlotIndex'));
  let SlotTeam = Number(event.dataTransfer!.getData('SlotTeam'));

  let playerIndexNum = Number(PlayerIndex);

  if (PlayerIndex === '' || isNaN(playerIndexNum) || playerIndexNum < 0) {
    console.error("onDrop - Invalid PlayerIndex:", PlayerIndex);
    return;
  }

  let data = Players.value.find((e) => e && e.id === playerIndexNum);

  if (!data) {
    console.error("onDrop - Invalid player data at index:", playerIndexNum);
    return;
  }

  let existsTeam0 = teams.team0.findIndex((e) => e && e.title === data.title);
  let existsTeam1 = teams.team1.findIndex((e) => e && e.title === data.title);

  if (existsTeam0 >= 0) {
      delete teams.team0[existsTeam0];
  } 
  if (existsTeam1 >= 0) {
      delete teams.team1[existsTeam1];
  }
  
  let oldTeam = null;

  if (team) {
    oldTeam = teams.team1[index];
  } else {
    oldTeam = teams.team0[index];
  }
  

  if(SlotIndex >= 0 && SlotTeam === 1 && oldTeam)
  {
    teams.team1[SlotIndex] = oldTeam
  }

  if(SlotIndex >=0 && SlotTeam === 0  && oldTeam)
  {
    teams.team0[SlotIndex] = oldTeam;
  }


  
  if (team) {
    teams.team1[index] = data;
  } else {
    teams.team0[index] = data;
  }



};

</script>

<template>

  <main>
    <div class="d-flex">
      <v-text-field v-model="nick" :width="250" @keyup.enter="AddChip" label="Nick" variant="underlined"></v-text-field>
      <v-btn  @click="AddChip" class="align-self-center ma-4" color="#66c0f4">
        <v-icon icon="mdi mdi-plus"></v-icon> 
      </v-btn>
    </div>
    <div>
      <h5>Liczba graczy: {{ Players.length }}</h5>
    </div>
    <div id="PlayersChips" style="max-width: 40%;">
   
        <PlayerChip
        v-for="(player, index) in Players"
        :key="player.id"
        :title="player.title"
        :index="player.id"
        :startdrag="startDrag"
        @remove="chipRemove(index,player.title)"
        />
     
    </div>

  </main>

  <div>
    <v-container class="mt-4 ml-0 pl-0">
      <div>
        <v-btn  @click="RandomizeTeams" class="align-self-center ma-2" color="#66c0f4">
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
                @dragstart="startDrag($event, teams.team0[n-1] ? teams.team0[n-1].id : -1,n-1,0)"
                @drop="onDrop($event, 0, n-1)"
                @dragenter.prevent
                @dragover.prevent
              >
                <div v-if="teams.team0[n-1]" class="playerDiv">
                  <v-avatar size="20" start color="surface-variant">
                    <v-icon icon="mdi-account-circle"></v-icon>
                  </v-avatar>
                  <div class="d-flex" style="width: -webkit-fill-available;" >
                    {{ teams.team0[n-1].title }}
                  </div>
                  <div class="remove_team_card" width="100%" d-flex justify-end>
                    <v-btn v-if="teams.team0[n-1] && Players.find((e) => e && e.id === teams.team0[n-1].id && e.locked === true)" @click="lockPlayer(teams.team0[n-1] ? teams.team0[n-1].id : -1)" float-right icon="mdi-lock-outline" color="red-accent-3" size="27"></v-btn>
                    <v-btn v-else @click="lockPlayer(teams.team0[n-1] ? teams.team0[n-1].id : -1)" float-right icon="mdi-lock-open-variant-outline" color="transparent" size="27"></v-btn>
                    <v-btn @click="delete teams.team0[n-1]" float-right icon="mdi-close-thick" color="transparent" size="27"></v-btn>
                  </div>
                </div>
                <div class="d-flex ml-1" style="width: -webkit-fill-available;"  v-else>
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
                @dragstart="startDrag($event, teams.team1[n-1] ? teams.team1[n-1].id : -1,n-1,1)"
                @drop="onDrop($event, 1, n-1)"
                @dragenter.prevent
                @dragover.prevent
              >
                <div v-if="teams.team1[n-1]" class="playerDiv">
                  <v-avatar size="20" start color="surface-variant">
                    <v-icon icon="mdi-account-circle"></v-icon>
                  </v-avatar>
                  <div class="d-flex" style="width: -webkit-fill-available;">
                    {{ teams.team1[n-1].title }}
                  </div>
                  <div class="remove_team_card" width="100%" d-flex justify-end>
                    <v-btn v-if="teams.team1[n-1] && Players.find((e) => e && e.id === teams.team1[n-1].id && e.locked === true)" @click="lockPlayer(teams.team1[n-1] ? teams.team1[n-1].id : -1)" float-right icon="mdi-lock-outline" color="teal-accent-4" size="27"></v-btn>
                    <v-btn v-else @click="lockPlayer(teams.team1[n-1] ? teams.team1[n-1].id : -1)" float-right icon="mdi-lock-open-variant-outline" color="transparent" size="27"></v-btn>
                    <v-btn @click="delete teams.team1[n-1]" float-right icon="mdi-close-thick" color="transparent" size="27"></v-btn>
                  </div>
                </div>
                <div class="ml-1 d-flex" style="width: -webkit-fill-available;" v-else>
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
  cursor:grab;

}
.team_player:active, .playerchip:active
{
  cursor:grabbing;
}

.playerchip
{
  cursor:grab;
}

.playerDiv{
  width: 100%;
  align-items: center;
  display: flex;
}
.team_1:hover
{
  border: 4px solid #c7d5e0;
}
.team_0:hover
{
  border: 4px solid #c7d5e0;
}

.team_0, .team_1{
  background: linear-gradient(45deg, #171a21, #1b2838);
}

.t1, .t0{
    border-bottom: 1px solid rgb(255, 255, 255);
    padding-bottom: 3px;
    margin:0px 10px 0px 3px;
    color: white;
    font-weight: bold
}

</style>



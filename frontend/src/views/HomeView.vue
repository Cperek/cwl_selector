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

function AddChip() {
  Players.value.push({
    id: nextID++,
    title: nick.value
  });
  nick.value = '';
}

function RandomizeTeams() {
  
  teams.team0 = [];
  teams.team1 = [];

  let SortedPlayers = Players.value;
  SortedPlayers.sort((a, b) => 0.5 - Math.random());

  SortedPlayers.forEach((element) => {
    let randomTeam = Math.round(Math.random());
    if ((randomTeam && teams.team1.length < 5) || teams.team0.length > 4) {
      teams.team1.push(element);
    } else {
      teams.team0.push(element);
    }
  });
}

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
            <h3>TEAM 1</h3>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4">
            <h3>TEAM 2</h3>
          </v-col>
        </v-row>
          <v-row class="mx-6" no-gutters 
          v-for="n in 5"
            :key="n"
            :class="'player' + n"
          >  
          
          <v-col 
          v-if="teams.team0[n-1]"
          cols="4">
            <v-sheet class="ma-2 ml-0 px-4 py-6 bg-surface-variant team_0">
              <v-avatar size="32" start color="surface-variant">
                <v-icon icon="mdi-account-circle"></v-icon>
              </v-avatar>
              {{ teams.team0[n-1].title }}
            </v-sheet>
          </v-col>

          <v-spacer></v-spacer>

          <v-col 
          v-if="teams.team1[n-1]"
          cols="4">   
            <v-sheet class="ma-2 ml-0 px-4 py-6 bg-surface-variant team_1">
              <v-avatar size="32" start color="surface-variant">
                <v-icon icon="mdi-account-circle"></v-icon>
              </v-avatar>
              {{ teams.team1[n-1].title }}
            </v-sheet>
          </v-col>
          
        </v-row>
      </div>
    </v-container>
  </div>
</template>



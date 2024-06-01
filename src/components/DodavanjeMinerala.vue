<template>
  <div>
    <br><br><br><br>
    <h1>Minerals</h1>
    <button @click="setMinerals">Set Minerals</button>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Formula</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mineral, index) in minerals" :key="mineral.name" :class="{ DrugiTR: index % 2 !== 0 }">
          <td>{{ mineral.name }}</td>
          <td>{{ mineral.formula }}</td>
          <td>{{ mineral.number }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { doc, setDoc } from "/VueProjekt/node_modules/firebase/firestore/dist/firestore/index.d.ts";
import db from '/VueProjekt/src/firebase/init.js';

export default {
  data() {
    return {
      minerals: [
        
      ]
    };
  },
  methods: {
    async setMinerals() {
      const mineralsRef = doc(db, "Elementi", "ELEMENT", "Minerali", "SviMinerali");

      const mineralsData = {
        minerals: this.minerals.map(mineral => ({
          ...mineral,
          number: mineral.number.toFixed(2)  // Convert number to string with two decimal places
        }))
      };

      try {
        await setDoc(mineralsRef, mineralsData);
        console.log("Document written successfully!");
      } catch (e) {
        console.error("Error writing document: ", e);
      }
    }
  }
};
</script>
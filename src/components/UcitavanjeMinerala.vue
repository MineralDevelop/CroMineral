<template>
        
        

        
       


        <div v-if="minerals && Dohvati && Dohvati.Poruka === null" class="VanjskaGrupacija">
          <div class="boxxxx">
            Poredaj prema:
            <button id="myButton" @click="sortBy('name')">Imenu</button>
            <button id="myButton" @click="sortBy('formula')">Formuli</button>
            <button id="myButton" @click="sortBy('number')">Postotku</button>
          </div>
          <div class="Medju">
            <table class="Tabla">
              <tr>
                <th colspan="3" class="GlNas">Udio {{Dohvati.ImeG}} u mineralima</th>
              </tr>
              <tr>
                <th class="PodNI">Ime minerala engl. + (hrv.)</th>
                <th class="PodNF">Formula minerala</th>
                <th class="PodNP">{{Dohvati.Ime}} wt%</th>
              </tr>
              <tr v-for="(mineral, index) in sortedMinerals" :key="mineral.name" :class="{ DrugiTR: index % 2 !== 1 }">
                <td v-html="mineral.name"  class="Imee"></td>
                <td v-html="mineral.formula"  class="Formulaa"></td>
                <td  class="Postotakk">{{mineral.displayNumber}}%</td>
              </tr>
            </table>
          </div>
        </div>
        <div v-else-if="Dohvati" class="VanjskaGrupacija">
          <div class="Medju">
            <table class="Tabla">
              <tr>
                <th colspan="3" class="GlNas">Udio {{Dohvati.ImeG}} u mineralima</th>
              </tr>
              <tr>
                <td style="border-left: none; border-right: none;">{{Dohvati.Poruka}}</td>
              </tr>
            </table>
          </div>
        </div>
        
        <!--<div v-else-if="Dohvati">
          <table class="Tabla">
            <tr>
              <th colspan="3" class="GlNas">Udio {{Dohvati.ImeG}} u mineralima</th>
            </tr>
            <div v-else>
              <tr>
              <td style="border-left: none; border-right: none;">{{Dohvati.Poruka}}</td>
            </tr>
            </div>
          </table>
        </div>-->
       
  
</template>
<script>
import { doc, getDoc } from "/VueProjekt/node_modules/firebase/firestore/dist/firestore/index.d.ts";
import db from '/VueProjekt/src/firebase/init.js';

export default {
   props: {
    OdabraniMineral: {
      type: String,
    },
  },
  created() {
    this.fetchMinerals0();
    this.fetchMinerals();
  },
  data() {
    return {
      Dohvati: null,
      minerals: [],
      sortKey: 'number',
      sortOrder: 'desc',
    };
  },
  computed: {
    sortedMinerals() {
      if (this.sortKey) {
        return this.minerals.slice().sort((a, b) => {
          let result = 0;
          if (a[this.sortKey] > b[this.sortKey]) result = 1;
          if (a[this.sortKey] < b[this.sortKey]) result = -1;
          return this.sortOrder === 'asc' ? result : -result;
        });
      } else {
        return this.minerals;
      }
    }
  },
  methods: {
    async fetchMinerals0() {
    try{
      const docSnap = await getDoc(doc(db, 'Elementi', this.OdabraniMineral));
      if (docSnap.exists()){
        this.Dohvati = docSnap.data();
      }else {
        this.$emit('elementNotFound');
      }
      }catch (error) {
        console.error('Error getting document:', error);
      }
    },
    async fetchMinerals() {
      const docRef = doc(db, 'Elementi', this.OdabraniMineral, 'Minerali', 'SviMinerali');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.minerals = docSnap.data().minerals;
        let fetchedMinerals = docSnap.data().minerals;
        this.minerals = fetchedMinerals.map(mineral => ({
            ...mineral,
            displayNumber: mineral.number.toString().replace(/\./g, ','),
            formula: mineral.formula.replace(/\./g, ','),
            number: parseFloat(mineral.number)
          }));
        
      } else {
        console.log("No such document!");
      }
    },
    
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    }
  },
  
};
</script>
<style scoped>
  .boxxxx{
    display: flex;
    justify-content: end;
    width: 90vw;
    box-sizing: border-box;
    font-size: bold;
    height: 2.2vw;
    align-items: center;
    font-weight: bold;
  }
  .Medju{
    margin-top: 0;
  }
  .VanjskaGrupacija{
    flex-direction: column;
    margin-top: 1vw;
  }
  #myButton{
    margin-left: 0.5vw;
    background: transparent;
    border: none;
    padding: 0.2vw;
    border-radius: 0.3vw;
    font-weight: bold;
    background-color: rgb(206, 206, 206);
  }
  
  #myButton:hover{
    background: rgb(233, 233, 233);
  }
  #myButton:focus:not(:active) {
    background-color: rgb(70, 70, 70);
    color: white;
  }
</style>
<!--<template>
  <div>
    <h1>Minerals</h1>
    <table>
      <thead>
        <tr>
          <th @click="sortBy('Imena')">Name</th>
          <th @click="sortBy('Formule')">Formula</th>
          <th @click="sortBy('number')">Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mineral in sortedMinerals" :key="mineral.Imena">
          <td>{{ mineral.Imena }}</td>
          <td>{{ mineral.Formule }}</td>
          <td>{{ mineral.number }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { doc, getDoc } from "C:/VueProjekt/src/firebase/firestore";
import db from './firebase';

export default {
  data() {
    return {
      minerals: [],
      sortKey: 'Imena', // default sort key
      sortOrder: 'asc' // default sort order
    };
  },
  computed: {
    sortedMinerals() {
      return this.minerals.sort((a, b) => {
        let result = 0;
        if (a[this.sortKey] > b[this.sortKey]) result = 1;
        if (a[this.sortKey] < b[this.sortKey]) result = -1;
        return this.sortOrder === 'asc' ? result : -result;
      });
    }
  },
  methods: {
    async fetchMinerals() {
      const docRef = doc(db, 'Elementi', 'Vodik', 'Minerali', 'SviMinerali');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.minerals = docSnap.data().minerals;
      } else {
        console.log("No such document!");
      }
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    }
  },
  created() {
    this.fetchMinerals();
  }
};
</script>

<template>
  <div>
    {{Ispisi.LAM}}
  </div>
</template>

<script>
import db from "/VueProjekt/src/firebase/init.js";
import { doc, getDoc } from "/VueProjekt/node_modules/firebase/firestore/dist/firestore/index.d.ts";

export default {
    data() {
        return {
        Ispisi: null,
        //processedParagraph5: null,
        };
    },
    created() {
        this.getSimbol();
    },
  methods: {
    async getSimbol() {
      try {
        // Get the document snapshot
        const docSnap = await getDoc(doc(db, 'Elementi', 'Vodik', 'Minerali'));
        if (docSnap.exists()) {
          // Set the data to the retrieved document data
          this.Ispisi = docSnap.data();
          //this.processParagraphs();
        }
      }catch (error) {
        console.error('Error getting document:', error);
      }
      
    }
  }

    /*data() {
        return {
            products: [
              { ime: 'Bounahasite<br>(-)', formula: 'Cu<sup class="SupSet">1+</sup>Cu<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">3</sub>Cl<sub class="SubSet4">2</sub>', postotak: '0,97' },
              { ime: 'Georgechaoite<br>(-)', formula: 'KNaZrSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,97' },
              { ime: 'Hennomartinite<br>(-)', formula: 'SrMn<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,97' },
              { ime: 'Hidalgoite<br>(-)', formula: 'PbAl<sub class="SubSet4">3</sub>(SO<sub class="SubSet4">4</sub>)(AsO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">6</sub>', postotak: '0,97' },
              { ime: 'Mauriziodiniite<br>(-)', formula: '(NH<sub class="SubSet4">4</sub>)(As<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>I', postotak: '0,97' },
              { ime: 'Piretite<br>(-)', formula: 'Ca(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>(Se<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,97' },
              { ime: 'Tyretskite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>B<sub class="SubSet4">5</sub>O<sub class="SubSet4">9</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,97' },
              { ime: 'Yaroslavite<br>(-)', formula: 'Ca<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>F<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,97' },
              { ime: 'Franklinfurnaceite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Mn<sup class="SupSet">3+</sup>Fe<sup class="SupSet">3+</sup>Zn<sub class="SubSet4">2</sub>Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">8</sub>', postotak: '0,96' },
              { ime: 'Iriginite<br>(-)', formula: '(UO<sub class="SubSet4">2</sub>)Mo<sup class="SupSet">6+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,96' },
              { ime: 'Markascherite<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>(MoO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">4</sub>', postotak: '0,96' },
              { ime: 'Penkvilksite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>TiSi<sub class="SubSet4">4</sub>O<sub class="SubSet4">11</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,96' },
              { ime: 'Phosphuranylite<br>(-)', formula: 'KCa(H<sub class="SubSet4">3</sub>O)<sub class="SubSet4">3</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">7</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>O<sub class="SubSet4">4</sub> &#183; 8H<sub class="SubSet4">2</sub>O', postotak: '0,96' },
              { ime: 'Strontioborite<br>(-)', formula: 'Sr[B<sub class="SubSet4">8</sub>O<sub class="SubSet4">11</sub>(OH)<sub class="SubSet4">4</sub>]', postotak: '0,96' },
              { ime: 'Szenicsite<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>(MoO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">4</sub>', postotak: '0,96' },
              { ime: 'Talmessite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mg(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,96' },
              { ime: 'Wendwilsonite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mg(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,96' },
              { ime: 'Donowensite<br>(-)', formula: 'Ca(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(V<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>', postotak: '0,95' },
              { ime: 'Holtstamite<br>(-)', formula: 'Ca<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,95' },
              { ime: 'Lavendulan<br>(-)', formula: 'NaCaCu<sub class="SubSet4">5</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>Cl &#183; 5H<sub class="SubSet4">2</sub>O', postotak: '0,95' },
              { ime: 'Nechelyustovite<br>(-)', formula: '(Na◻)◻<sub class="SubSet4">2</sub>Ba<sub class="SubSet4">4</sub>Ti<sub class="SubSet4">4</sub>Nb<sub class="SubSet4">4</sub>(Na<sub class="SubSet4">11</sub>◻)Ti<sub class="SubSet4">4</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">8</sub>O<sub class="SubSet4">8</sub>(OH)<sub class="SubSet4">8</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">12</sub>', postotak: '0,95' },
              { ime: 'Nullaginite<br>(-)', formula: 'Ni<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,95' },
              { ime: 'Perchiazziite<br>(-)', formula: 'Co<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,95' },
              { ime: 'Stokesite<br>(-)', formula: 'CaSnSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,95' },
              { ime: 'Vandendriesscheite<br>(-)', formula: 'Pb<sub class="SubSet4">1.6</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">10</sub>O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">11</sub> &#183; 11H<sub class="SubSet4">2</sub>O', postotak: '0,95' },
              { ime: 'Arsenovanmeersscheite<br>(-)', formula: 'U(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,94' },
              { ime: 'Clinohedrite<br>(-)', formula: 'CaZn(SiO<sub class="SubSet4">4</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,94' },
              { ime: 'Curienite<br>(-)', formula: 'Pb(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 5H<sub class="SubSet4">2</sub>O', postotak: '0,94' },
              { ime: 'Gageite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">21</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">27</sub>(OH)<sub class="SubSet4">20</sub>', postotak: '0,94' },
              { ime: 'Shubnikovite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Cu<sub class="SubSet4">8</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub>Cl(OH) &#183; 7H<sub class="SubSet4">2</sub>O (?)', postotak: '0,94' },
              { ime: 'Stringhamite<br>(-)', formula: 'CaCu(SiO<sub class="SubSet4">4</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,94' },
              { ime: 'Dob&scaron;in&aacute;ite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Ca(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,93' },
              { ime: 'Gauthierite<br>(-)', formula: 'KPb[(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">7</sub>O<sub class="SubSet4">5</sub>(OH)<sub class="SubSet4">7</sub>] &#183; 8H<sub class="SubSet4">2</sub>O', postotak: '0,93' },
              { ime: 'Glaukosphaerite<br>(-)', formula: 'CuNi(CO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,93' },
              { ime: 'Holfertite<br>(-)', formula: '(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">1.75</sub>Ca<sub class="SubSet4">0.25</sub>TiO<sub class="SubSet4">4</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,93' },
              { ime: 'Klaprothite<br>(-)', formula: 'Na<sub class="SubSet4">6</sub>(UO<sub class="SubSet4">2</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">4</sub>', postotak: '0,93' },
              { ime: 'Kolwezite<br>(-)', formula: 'CuCo(CO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,93' },
              { ime: 'Magnesiozippeite<br>(-)', formula: 'Mg(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)O<sub class="SubSet4">2</sub> &#183; 3.5H<sub class="SubSet4">2</sub>O', postotak: '0,93' },
              { ime: 'Manganrockbridgeite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">4</sub>(H<sub class="SubSet4">2</sub>O)', postotak: '0,93' },
              { ime: 'P&eacute;ligotite<br>(-)', formula: 'Na<sub class="SubSet4">6</sub>(UO<sub class="SubSet4">2</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">4</sub>', postotak: '0,93' },
              { ime: 'Segerstromite<br>(-)', formula: 'Ca<sub class="SubSet4">3</sub>(As<sup class="SupSet">5+</sup>O<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>[As<sup class="SupSet">3+</sup>(OH)<sub class="SubSet4">3</sub>]<sub class="SubSet4">2</sub>', postotak: '0,93' },
              { ime: 'Segnitite<br>(-)', formula: 'PbFe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)(AsO<sub class="SubSet4">3</sub>OH)(OH)<sub class="SubSet4">6</sub>', postotak: '0,93' },
              { ime: 'Wairakite<br>(-)', formula: 'Ca(Si<sub class="SubSet4">4</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">12</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,93' },
              { ime: 'Analcime<br>(-)', formula: 'Na(AlSi<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,92' },
              { ime: 'Clinotobermorite<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">17</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub> &#183; (Ca &#183; 3H<sub class="SubSet4">2</sub>O)', postotak: '0,92' },
              { ime: 'Erlianite<br>(-)', formula: 'Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">15</sub>(OH)<sub class="SubSet4">8</sub>', postotak: '0,92' },
              { ime: 'Hubeite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup>Fe<sup class="SupSet">3+</sup>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>(OH) &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,92' },
              { ime: 'Inesite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">7</sub>Si<sub class="SubSet4">10</sub>O<sub class="SubSet4">28</sub>(OH)<sub class="SubSet4">2</sub> &#183; 5H<sub class="SubSet4">2</sub>O', postotak: '0,92' },
              { ime: 'Larisaite<br>(-)', formula: 'Na(H<sub class="SubSet4">3</sub>O)(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>(Se<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,92' },
              { ime: 'Melcherite<br>(-)', formula: 'Ba<sub class="SubSet4">2</sub>Na<sub class="SubSet4">2</sub>Mg[Nb<sub class="SubSet4">6</sub>O<sub class="SubSet4">19</sub>] &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,92' },
              { ime: 'Metahewettite<br>(-)', formula: 'CaV<sup class="SupSet">5+</sup><sub class="SubSet4">6</sub>O<sub class="SubSet4">16</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,92' },
              { ime: 'Metasideronatrite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,92' },
              { ime: 'Mourite<br>(-)', formula: '(UO<sub class="SubSet4">2</sub>)(Mo<sup class="SupSet">6+</sup>)<sub class="SubSet4">5</sub>O<sub class="SubSet4">16</sub> &#183; 5H<sub class="SubSet4">2</sub>O', postotak: '0,92' },
              { ime: 'Nyholmite<br>(-)', formula: 'Cd<sub class="SubSet4">3</sub>Zn<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">3</sub>OH)<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,92' },
              { ime: 'Tobermorite<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">17</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub> &#183; (Ca &#183; 3H<sub class="SubSet4">2</sub>O)', postotak: '0,92' },
              { ime: 'Barnesite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>V<sup class="SupSet">5+</sup><sub class="SubSet4">6</sub>O<sub class="SubSet4">16</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,91' },
              { ime: 'Calcioancylite-(La)<br>(-)', formula: '(LaCa)(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)(H<sub class="SubSet4">2</sub>O)', postotak: '0,91' },
              { ime: 'Cherokeeite<br>(-)', formula: '[Pb<sub class="SubSet4">2</sub>Zn(OH)<sub class="SubSet4">4</sub>](SO<sub class="SubSet4">4</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,91' },
              { ime: 'Corkite<br>(-)', formula: 'PbFe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(SO<sub class="SubSet4">4</sub>)(PO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">6</sub>', postotak: '0,91' },
              { ime: 'Cuprocherokeeite<br>(-)', formula: '[Pb<sub class="SubSet4">8</sub>Zn<sub class="SubSet4">3</sub>Cu<sup class="SupSet">2+</sup>(OH)<sub class="SubSet4">16</sub>](SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,91' },
              { ime: 'Dorallcharite<br>(-)', formula: 'TlFe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub>', postotak: '0,91' },
              { ime: 'Fuenzalidaite<br>(-)', formula: 'K<sub class="SubSet4">3</sub>Na<sub class="SubSet4">5</sub>Mg<sub class="SubSet4">5</sub>(IO<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub> &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,91' },
              { ime: 'Magnesiochloritoid<br>(-)', formula: 'MgAl<sub class="SubSet4">2</sub>O(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,91' },
              { ime: 'Malachite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,91' },
              { ime: 'Natrozippeite<br>(-)', formula: 'Na<sub class="SubSet4">5</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">8</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>O<sub class="SubSet4">5</sub>(OH)<sub class="SubSet4">3</sub> &#183; 12H<sub class="SubSet4">2</sub>O', postotak: '0,91' },
              { ime: 'Pachnolite<br>(-)', formula: 'NaCaAlF<sub class="SubSet4">6</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,91' },
              { ime: 'Papagoite<br>(-)', formula: 'CaCuAlSi<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,91' },
              { ime: 'Thomsenolite<br>(-)', formula: 'NaCaAlF<sub class="SubSet4">6</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,91' },
              { ime: 'Zeophyllite<br>(-)', formula: 'Ca<sub class="SubSet4">13</sub>Si<sub class="SubSet4">10</sub>O<sub class="SubSet4">28</sub>(OH)<sub class="SubSet4">2</sub>F<sub class="SubSet4">8</sub> &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,91' },
              { ime: 'Brandtite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,90' },
              { ime: 'Cesbronite<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>Te<sup class="SupSet">6+</sup>O<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,90' },
              { ime: 'Cornetite<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>(PO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">3</sub>', postotak: '0,90' },
              { ime: 'Dewindtite<br>(-)', formula: 'H<sub class="SubSet4">2</sub>Pb<sub class="SubSet4">3</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">6</sub>O<sub class="SubSet4">4</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub> &#183; 12H<sub class="SubSet4">2</sub>O', postotak: '0,90' },
              { ime: 'Jensenite<br>(-)', formula: 'Cu<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Te<sup class="SupSet">6+</sup>O<sub class="SubSet4">6</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,90' },
              { ime: 'Manganarsite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>As<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,90' },
              { ime: 'Parabrandtite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,90' },
              { ime: 'Par&aacute;dsasv&aacute;rite<br>(-)', formula: 'Zn<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,90' },
              { ime: 'Plimerite<br>(-)', formula: 'Zn<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">4</sub>(H<sub class="SubSet4">2</sub>O)', postotak: '0,90' },
              { ime: 'Rosasite<br>(-)', formula: 'CuZn(CO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,90' },
              { ime: 'Szymańskiite<br>(-)', formula: 'Hg<sub class="SubSet4">16</sub>Ni<sub class="SubSet4">6</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">12</sub>(OH)<sub class="SubSet4">12</sub>(H<sub class="SubSet4">3</sub>O)<sub class="SubSet4">8</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,90' },
              { ime: 'Xocomecatlite<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>(Te<sup class="SupSet">6+</sup>O<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">4</sub>', postotak: '0,90' },
              { ime: 'Za&iuml;rite<br>(-)', formula: 'BiFe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub>', postotak: '0,90' },
              { ime: 'Anorthoroselite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Co(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,89' },
              { ime: 'Arhbarite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>Mg(AsO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">3</sub>', postotak: '0,89' },
              { ime: 'Beaverite-(Cu)<br>(-)', formula: 'Pb(Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Cu)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub>', postotak: '0,89' },
              { ime: 'Beaverite-(Zn)<br>(-)', formula: 'Pb(Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Zn)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub>', postotak: '0,89' },
              { ime: 'Cobaltzippeite<br>(-)', formula: 'Co(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)O<sub class="SubSet4">2</sub> &#183; 3.5H<sub class="SubSet4">2</sub>O', postotak: '0,89' },
              { ime: 'Esperanzaite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>F<sub class="SubSet4">4</sub>(OH) &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,89' },
              { ime: 'Letnikovite-(Ce)<br>(-)', formula: '(Na◻)Ca<sub class="SubSet4">2</sub>Ce<sub class="SubSet4">2</sub>[Si<sub class="SubSet4">7</sub>O<sub class="SubSet4">17</sub>(OH)]F<sub class="SubSet4">4</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">4</sub>', postotak: '0,89' },
              { ime: 'Nickeltalmessite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Ni(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,89' },
              { ime: 'Plavnoite<br>(-)', formula: 'K<sub class="SubSet4">0.8</sub>Mn<sub class="SubSet4">0.6</sub>[(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)] &#183; 3.5H<sub class="SubSet4">2</sub>O', postotak: '0,89' },
              { ime: 'Riomarinaite<br>(-)', formula: 'Bi(SO<sub class="SubSet4">4</sub>)(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,89' },
              { ime: 'Roselite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Co(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,89' },
              { ime: 'Sardignaite<br>(-)', formula: 'BiMo<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>(OH) &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,89' },
              { ime: 'Voudourisite<br>(-)', formula: 'Cd(SO<sub class="SubSet4">4</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,89' },
              { ime: 'Zinczippeite<br>(-)', formula: 'Zn(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)O<sub class="SubSet4">2</sub> &#183; 3.5H<sub class="SubSet4">2</sub>O', postotak: '0,89' },
              { ime: 'Alcantarillaite<br>(-)', formula: '[Fe<sup class="SupSet">3+</sup><sub class="SubSet4">0.5</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">4</sub>][CaAs<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2.5</sub>W<sup class="SupSet">6+</sup><sub class="SubSet4">0.5</sub>)(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>]', postotak: '0,88' },
              { ime: 'Clarkeite<br>(-)', formula: 'Na(UO<sub class="SubSet4">2</sub>)O(OH) &#183; nH<sub class="SubSet4">2</sub>O', postotak: '0,88' },
              { ime: 'Eugsterite<br>(-)', formula: 'Na<sub class="SubSet4">4</sub>Ca(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,88' },
              { ime: 'Gaitite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Zn(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,88' },
              { ime: 'Graulichite-(Ce)<br>(-)', formula: 'CeFe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub>', postotak: '0,88' },
              { ime: 'Graulichite-(La)<br>(-)', formula: 'LaFe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub>', postotak: '0,88' },
              { ime: 'Innsbruckite<br>(-)', formula: 'Mn<sub class="SubSet4">33</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">5</sub>)<sub class="SubSet4">14</sub>(OH)<sub class="SubSet4">38</sub>', postotak: '0,88' },
              { ime: 'Picaite<br>(-)', formula: 'NaCa[AsO<sub class="SubSet4">3</sub>OH][AsO<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>]', postotak: '0,88' },
              { ime: 'Retzian-(Ce)<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Ce(AsO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">4</sub>', postotak: '0,88' },
              { ime: 'Retzian-(La)<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>La(AsO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">4</sub>', postotak: '0,88' },
              { ime: 'Rruffite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Cu(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,88' },
              { ime: 'Sussexite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup>BO<sub class="SubSet4">2</sub>(OH)', postotak: '0,88' },
              { ime: 'Triangulite<br>(-)', formula: 'Al<sub class="SubSet4">3</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">4</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">5</sub> &#183; 5H<sub class="SubSet4">2</sub>O', postotak: '0,88' },
              { ime: 'Zincroselite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Zn(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,88' },
              { ime: 'Belloite<br>(-)', formula: 'Cu(OH)Cl', postotak: '0,87' },
              { ime: 'Bementite<br>(-)', formula: 'Mn<sub class="SubSet4">7</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">15</sub>(OH)<sub class="SubSet4">8</sub>', postotak: '0,87' },
              { ime: 'Fabri&egrave;site<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>Al<sub class="SubSet4">3</sub>Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">12</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,87' },
              { ime: 'Lipuite<br>(-)', formula: 'KNa<sub class="SubSet4">8</sub>Mn<sup class="SupSet">3+</sup><sub class="SubSet4">5</sub>Mg<sub class="SubSet4">0.5</sub>[Si<sub class="SubSet4">12</sub>O<sub class="SubSet4">30</sub>(OH)<sub class="SubSet4">4</sub>](PO<sub class="SubSet4">4</sub>)O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,87' },
              { ime: 'Metatamboite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(OH)(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)(Te<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>[Te<sup class="SupSet">4+</sup>O(OH)<sub class="SubSet4">2</sub>](H<sub class="SubSet4">2</sub>O)', postotak: '0,87' },
              { ime: 'Metauroxite<br>(-)', formula: '(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>(C<sub class="SubSet4">2</sub>O<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,87' },
              { ime: 'Paraumbite<br>(-)', formula: 'K<sub class="SubSet4">3</sub>Zr<sub class="SubSet4">2</sub>H(Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub>)<sub class="SubSet4">2</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,87' },
              { ime: 'Retzian-(Nd)<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Nd(AsO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">4</sub>', postotak: '0,87' },
              { ime: 'Riversideite<br>(-)', formula: 'Ca<sub class="SubSet4">5</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">16</sub>(OH)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,87' },
              { ime: 'Tumchaite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>ZrSi<sub class="SubSet4">4</sub>O<sub class="SubSet4">11</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,87' },
              { ime: 'Umohoite<br>(-)', formula: '(UO<sub class="SubSet4">2</sub>)(MoO<sub class="SubSet4">4</sub>) &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,87' },
              { ime: 'Yecoraite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>Bi<sub class="SubSet4">5</sub>O<sub class="SubSet4">9</sub>(Te<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)(Te<sup class="SupSet">6+</sup>O<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 9H<sub class="SubSet4">2</sub>O', postotak: '0,87' },
              { ime: 'Cafetite<br>(-)', formula: 'CaTi<sub class="SubSet4">2</sub>O<sub class="SubSet4">5</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,86' },
              { ime: 'Fermiite<br>(-)', formula: 'Na<sub class="SubSet4">4</sub>(UO<sub class="SubSet4">2</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,86' },
              { ime: 'Kassite<br>(-)', formula: 'CaTi<sub class="SubSet4">2</sub>O<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,86' },
              { ime: 'Menezesite<br>(-)', formula: 'Ba<sub class="SubSet4">3</sub>MgZr<sub class="SubSet4">4</sub>Nb<sub class="SubSet4">12</sub>O<sub class="SubSet4">42</sub> &#183; 12H<sub class="SubSet4">2</sub>O', postotak: '0,86' },
              { ime: 'Nickellotharmeyerite<br>(-)', formula: 'CaNi<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,86' },
              { ime: 'Noelbensonite<br>(-)', formula: 'BaMn<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,86' },
              { ime: 'Orientite<br>(-)', formula: 'Ca<sub class="SubSet4">8</sub>Mn<sup class="SupSet">3+</sup><sub class="SubSet4">10</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">10</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,86' },
              { ime: 'Pandoraite-Ca<br>(-)', formula: 'CaV<sup class="SupSet">4+</sup><sub class="SubSet4">5</sub>V<sup class="SupSet">5+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">16</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,86' },
              { ime: 'Pumpellyite-(Mg)<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>MgAl<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,86' },
              { ime: 'Bertrandite<br>(-)', formula: 'Be<sub class="SubSet4">4</sub>Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,85' },
              { ime: 'Beudantite<br>(-)', formula: 'PbFe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)(SO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">6</sub>', postotak: '0,85' },
              { ime: 'Cobaltlotharmeyerite<br>(-)', formula: 'CaCo<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,85' },
              { ime: 'Gunmaite<br>(-)', formula: '(Na<sub class="SubSet4">2</sub>Sr)Sr<sub class="SubSet4">2</sub>Al<sub class="SubSet4">10</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>F<sub class="SubSet4">14</sub>(OH)<sub class="SubSet4">12</sub>', postotak: '0,85' },
              { ime: 'Attikaite<br>(-)', formula: 'Ca<sub class="SubSet4">3</sub>Cu<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,84' },
              { ime: 'Hemimorphite<br>(-)', formula: 'Zn<sub class="SubSet4">4</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,84' },
              { ime: 'Henritermierite<br>(-)', formula: 'Ca<sub class="SubSet4">3</sub>Mn<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,84' },
              { ime: 'Kampelite<br>(-)', formula: 'Ba<sub class="SubSet4">3</sub>Mg<sub class="SubSet4">1.5</sub>Sc<sub class="SubSet4">4</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">3</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,84' },
              { ime: 'Roubaultite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,84' },
              { ime: 'Wegscheiderite<br>(-)', formula: 'Na<sub class="SubSet4">5</sub>H<sub class="SubSet4">3</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>', postotak: '0,84' },
              { ime: 'Wortupaite<br>(-)', formula: 'MgNi<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>(Te<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,84' },
              { ime: 'Bobmeyerite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>(Al<sub class="SubSet4">3</sub>Cu)(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)(S<sub class="SubSet4">0.5</sub>Si<sub class="SubSet4">0.5</sub>O<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">7</sub>Cl(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">3</sub>', postotak: '0,83' },
              { ime: 'Bolotinaite<br>(-)', formula: '(Na<sub class="SubSet4">7</sub>◻)(Al<sub class="SubSet4">6</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">24</sub>)F &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,83' },
              { ime: 'Campostriniite<br>(-)', formula: '(Bi<sub class="SubSet4">2.5</sub>Na<sub class="SubSet4">0.5</sub>)(NH<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>Na<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,83' },
              { ime: 'Giniite<br>(-)', formula: 'Fe<sup class="SupSet">2+</sup>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,83' },
              { ime: 'Kinoite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Cu<sub class="SubSet4">2</sub>Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,83' },
              { ime: 'Kleberite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup>Ti<sub class="SubSet4">6</sub>O<sub class="SubSet4">11</sub>(OH)<sub class="SubSet4">5</sub>', postotak: '0,83' },
              { ime: 'Lotharmeyerite<br>(-)', formula: 'CaZn<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,83' },
              { ime: 'Tancaite-(Ce)<br>(-)', formula: 'FeCe(MoO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,83' },
              { ime: 'Turtmannite<br>(-)', formula: 'Mn<sub class="SubSet4">25</sub>O<sub class="SubSet4">5</sub>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">20</sub>', postotak: '0,83' },
              { ime: 'Whelanite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>Ca<sub class="SubSet4">6</sub>[Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">17</sub>(OH)](CO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">3</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,83' },
              { ime: 'Ajoite<br>(-)', formula: 'K<sub class="SubSet4">3</sub>Cu<sup class="SupSet">2+</sup><sub class="SubSet4">20</sub>Al<sub class="SubSet4">3</sub>Si<sub class="SubSet4">29</sub>O<sub class="SubSet4">76</sub>(OH)<sub class="SubSet4">16</sub> &#183; 8H<sub class="SubSet4">2</sub>O', postotak: '0,82' },
              { ime: 'Caminite<br>(-)', formula: 'Mg<sub class="SubSet4">7</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">5</sub>(OH)<sub class="SubSet4">4</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,82' },
              { ime: 'Darapskite<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>(SO<sub class="SubSet4">4</sub>)(NO<sub class="SubSet4">3</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,82' },
              { ime: 'Ermakovite<br>(-)', formula: '(NH<sub class="SubSet4">4</sub>)(As<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>Br', postotak: '0,82' },
              { ime: 'Krivovichevite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>Al(OH)<sub class="SubSet4">6</sub>(SO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,82' },
              { ime: 'Lermontovite<br>(-)', formula: 'U<sup class="SupSet">4+</sup>(PO<sub class="SubSet4">4</sub>)(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,82' },
              { ime: 'Mikehowardite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>(V<sup class="SupSet">5+</sup>O<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,82' },
              { ime: 'Montesommaite<br>(-)', formula: 'K<sub class="SubSet4">9</sub>(Si<sub class="SubSet4">23</sub>Al<sub class="SubSet4">9</sub>)O<sub class="SubSet4">64</sub> &#183; 10H<sub class="SubSet4">2</sub>O', postotak: '0,82' },
              { ime: 'Reyerite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Ca<sub class="SubSet4">14</sub>Al<sub class="SubSet4">2</sub>Si<sub class="SubSet4">22</sub>O<sub class="SubSet4">58</sub>(OH)<sub class="SubSet4">8</sub> &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,82' },
              { ime: 'Wiperamingaite<br>(-)', formula: 'NaCaFe<sup class="SupSet">3+</sup>Al(PO<sub class="SubSet4">4</sub>)F<sub class="SubSet4">5</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,82' },
              { ime: 'Zdenĕkite<br>(-)', formula: 'NaPbCu<sub class="SubSet4">5</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>Cl &#183; 5H<sub class="SubSet4">2</sub>O', postotak: '0,82' },
              { ime: 'Arseniosiderite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>O<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,81' },
              { ime: 'Litvinskite<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>ZrSi<sub class="SubSet4">6</sub>O<sub class="SubSet4">13</sub>(OH)<sub class="SubSet4">5</sub>', postotak: '0,81' },
              { ime: 'Middlebackite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>C<sub class="SubSet4">2</sub>O<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,81' },
              { ime: 'Nollmotzite<br>(-)', formula: 'Mg[U<sup class="SupSet">5+</sup>(U<sup class="SupSet">6+</sup>O<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">4</sub>F<sub class="SubSet4">3</sub>] &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,81' },
              { ime: 'Pertsevite-(OH)<br>(-)', formula: 'Mg<sub class="SubSet4">2</sub>(BO<sub class="SubSet4">3</sub>)(OH)', postotak: '0,81' },
              { ime: 'Tungstite<br>(-)', formula: 'WO<sub class="SubSet4">3</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,81' },
              { ime: 'Bergenite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Ba<sub class="SubSet4">4</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">9</sub>O<sub class="SubSet4">6</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub> &#183; 16H<sub class="SubSet4">2</sub>O', postotak: '0,80' },
              { ime: 'Chloritoid<br>(-)', formula: 'Fe<sup class="SupSet">2+</sup>Al<sub class="SubSet4">2</sub>O(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,80' },
              { ime: 'Gallobeudantite<br>(-)', formula: 'PbGa<sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)(SO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">6</sub>', postotak: '0,80' },
              { ime: 'Lapeyreite<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>O[AsO<sub class="SubSet4">3</sub>(OH)]<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,80' },
              { ime: 'Natrochalcite<br>(-)', formula: 'NaCu<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,80' },
              { ime: 'Olmsteadite<br>(-)', formula: 'KFe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>NbO<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,80' },
              { ime: 'Ottr&eacute;lite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup>Al<sub class="SubSet4">2</sub>O(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,80' },
              { ime: 'Przhevalskite<br>(-)', formula: 'Pb(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,80' },
              { ime: 'Pumpellyite-(Mn<sup class="SupSet">2+</sup>)<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup>Al<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,80' },
              { ime: 'Rameauite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>Ca(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">6</sub>O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">4</sub> &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,80' },
              { ime: 'Rhabdophane-(Ce)<br>(-)', formula: 'Ce(PO<sub class="SubSet4">4</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,80' },
              { ime: 'Rhabdophane-(La)<br>(-)', formula: 'La(PO<sub class="SubSet4">4</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,80' },
              { ime: 'Ancylite-(Ce)<br>(-)', formula: 'CeSr(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,79' },
              { ime: 'Ancylite-(La)<br>(-)', formula: 'LaSr(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,79' },
              { ime: 'Clinoclase<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">3</sub>', postotak: '0,79' },
              { ime: 'Gilmarite<br>(-)', formula: 'Cu<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">3</sub>', postotak: '0,79' },
              { ime: 'Sabelliite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>Zn(AsO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">3</sub>', postotak: '0,79' },
              { ime: 'Warikahnite<br>(-)', formula: 'Zn<sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,79' },
              { ime: 'Attakolite<br>(-)', formula: 'CaMn<sup class="SupSet">2+</sup>Al<sub class="SubSet4">4</sub>(HSiO<sub class="SubSet4">4</sub>)(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,78' },
              { ime: 'Bellingerite<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>(IO<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,78' },
              { ime: 'Carbobystrite<br>(-)', formula: 'Na<sub class="SubSet4">8</sub>(Al<sub class="SubSet4">6</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">24</sub>)(CO<sub class="SubSet4">3</sub>) &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,78' },
              { ime: 'Carlhintzeite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>AlF<sub class="SubSet4">7</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,78' },
              { ime: 'Eakerite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Sn<sup class="SupSet">4+</sup>Al<sub class="SubSet4">2</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>(OH)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,78' },
              { ime: 'Frondelite<br>(-)', formula: '(Mn<sup class="SupSet">2+</sup><sub class="SubSet4">0.5</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">0.5</sub>)<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">5</sub>', postotak: '0,78' },
              { ime: 'Graemite<br>(-)', formula: 'Cu<sup class="SupSet">2+</sup>(Te<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,78' },
              { ime: 'Hannebachite<br>(-)', formula: 'Ca(SO<sub class="SubSet4">3</sub>) &#183; 0.5H<sub class="SubSet4">2</sub>O', postotak: '0,78' },
              { ime: 'Holdenite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">6</sub>Zn<sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">8</sub>', postotak: '0,78' },
              { ime: 'Pilipenkoite<br>(-)', formula: 'KCu(AsO<sub class="SubSet4">4</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,78' },
              { ime: 'Rhabdophane-(Nd)<br>(-)', formula: 'Nd(PO<sub class="SubSet4">4</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,78' },
              { ime: 'Rockbridgeite<br>(-)', formula: '(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">0.5</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">0.5</sub>)<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">5</sub>', postotak: '0,78' },
              { ime: 'Roggianite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>BeAl<sub class="SubSet4">2</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">13</sub>(OH)<sub class="SubSet4">2</sub> &#183; nH<sub class="SubSet4">2</sub>O (n &lt; 2.5)', postotak: '0,78' },
              { ime: 'Salesite<br>(-)', formula: 'Cu(IO<sub class="SubSet4">3</sub>)(OH)', postotak: '0,78' },
              { ime: 'Shijiangshanite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>CaAl(Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">14</sub>)(OH)<sub class="SubSet4">3</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,78' },
              { ime: 'Weeksite<br>(-)', formula: '(K)<sub class="SubSet4">2</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">13</sub>) &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,78' },
              { ime: 'Kaliochalcite<br>(-)', formula: 'KCu<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>[(OH)(H<sub class="SubSet4">2</sub>O)]', postotak: '0,77' },
              { ime: 'Luetheite<br>(-)', formula: 'CuAl(AsO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,77' },
              { ime: 'Shuiskite-(Mg)<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>MgCr<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,77' },
              { ime: 'Sulfatoredmondite<br>(-)', formula: '[Pb<sub class="SubSet4">8</sub>O<sub class="SubSet4">2</sub>Zn(OH)<sub class="SubSet4">6</sub>](SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub> &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,77' },
              { ime: 'Gatehouseite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,76' },
              { ime: 'Julgoldite-(Mg)<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>MgFe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,76' },
              { ime: 'Magnanelliite<br>(-)', formula: 'K<sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,76' },
              { ime: 'Mcgillite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">8</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">15</sub>(OH)<sub class="SubSet4">8</sub>Cl<sub class="SubSet4">2</sub>', postotak: '0,76' },
              { ime: 'Shinkolobweite<br>(-)', formula: 'Pb<sub class="SubSet4">1.33</sub>[U<sup class="SupSet">5+</sup>O(OH)(U<sup class="SupSet">6+</sup>O<sub class="SubSet4">2</sub>)<sub class="SubSet4">5</sub>O<sub class="SubSet4">4.67</sub>(OH)<sub class="SubSet4">5.33</sub>](H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">5</sub>', postotak: '0,76' },
              { ime: 'Arzrunite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Cu<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">4</sub>Cl<sub class="SubSet4">6</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,75' },
              { ime: 'Carlosruizite<br>(-)', formula: 'K<sub class="SubSet4">3</sub>Na<sub class="SubSet4">2</sub>Na<sub class="SubSet4">3</sub>Mg<sub class="SubSet4">5</sub>(IO<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub>(SeO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub> &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,75' },
              { ime: 'Korzhinskite<br>(-)', formula: 'CaB<sub class="SubSet4">2</sub>O<sub class="SubSet4">4</sub> &#183; 0.5H<sub class="SubSet4">2</sub>O', postotak: '0,75' },
              { ime: 'Natroboltwoodite<br>(-)', formula: 'Na(UO<sub class="SubSet4">2</sub>)(SiO<sub class="SubSet4">3</sub>OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,75' },
              { ime: 'Pandoraite-Ba<br>(-)', formula: 'BaV<sup class="SupSet">4+</sup><sub class="SubSet4">5</sub>V<sup class="SupSet">5+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">16</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,75' },
              { ime: 'Gerstmannite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup>MgZn(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,74' },
              { ime: 'Lintisite<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>LiTi<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,74' },
              { ime: 'Mercallite<br>(-)', formula: 'KH(SO<sub class="SubSet4">4</sub>)', postotak: '0,74' },
              { ime: 'Monetite<br>(-)', formula: 'Ca(PO<sub class="SubSet4">3</sub>OH)', postotak: '0,74' },
              { ime: 'Nelenite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">16</sub>As<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>Si<sub class="SubSet4">12</sub>O<sub class="SubSet4">36</sub>(OH)<sub class="SubSet4">17</sub>', postotak: '0,74' },
              { ime: 'Protasite<br>(-)', formula: 'Ba(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>O<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">2</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,74' },
              { ime: 'Schallerite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">16</sub>As<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>Si<sub class="SubSet4">12</sub>O<sub class="SubSet4">36</sub>(OH)<sub class="SubSet4">17</sub>', postotak: '0,74' },
              { ime: 'Weloganite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Sr<sub class="SubSet4">3</sub>Zr(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,74' },
              { ime: 'Belakovskiite<br>(-)', formula: 'Na<sub class="SubSet4">7</sub>(UO<sub class="SubSet4">2</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">3</sub>OH)(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">3</sub>', postotak: '0,73' },
              { ime: 'Donnayite-(Y)<br>(-)', formula: 'NaSr<sub class="SubSet4">3</sub>CaY(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,73' },
              { ime: 'Kazanskyite<br>(-)', formula: 'Ba◻TiNbNa<sub class="SubSet4">3</sub>Ti(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,73' },
              { ime: 'Metavanmeersscheite<br>(-)', formula: 'U(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,73' },
              { ime: 'Saamite<br>(-)', formula: 'Ba◻TiNbNa<sub class="SubSet4">3</sub>Ti(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,73' },
              { ime: 'Skorpionite<br>(-)', formula: 'Ca<sub class="SubSet4">3</sub>Zn<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,73' },
              { ime: 'Julgoldite-(Fe<sup class="SupSet">2+</sup>)<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,72' },
              { ime: 'Okhotskite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup>Mn<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,72' },
              { ime: 'Plumbogaidonnayite<br>(-)', formula: 'PbZrSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,72' },
              { ime: 'Tungusite<br>(-)', formula: 'Ca<sub class="SubSet4">14</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">9</sub>Si<sub class="SubSet4">24</sub>O<sub class="SubSet4">60</sub>(OH)<sub class="SubSet4">22</sub>', postotak: '0,72' },
              { ime: 'Agrinierite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>Ca[(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>O<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">2</sub>]<sub class="SubSet4">2</sub> &#183; 5H<sub class="SubSet4">2</sub>O', postotak: '0,71' },
              { ime: 'Clearcreekite<br>(-)', formula: 'Hg<sup class="SupSet">1+</sup><sub class="SubSet4">3</sub>(CO<sub class="SubSet4">3</sub>)(OH) &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,71' },
              { ime: 'Kalithallite<br>(-)', formula: 'K<sub class="SubSet4">3</sub>Tl<sup class="SupSet">3+</sup>Cl<sub class="SubSet4">6</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,71' },
              { ime: 'Kukisvumite<br>(-)', formula: 'Na<sub class="SubSet4">6</sub>ZnTi<sub class="SubSet4">4</sub>O<sub class="SubSet4">4</sub>(SiO<sub class="SubSet4">3</sub>)<sub class="SubSet4">8</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,71' },
              { ime: 'Mammothite<br>(-)', formula: 'Pb<sub class="SubSet4">6</sub>Cu<sub class="SubSet4">4</sub>AlSb<sup class="SupSet">5+</sup>O<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>Cl<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">16</sub>', postotak: '0,71' },
              { ime: 'Manganokukisvumite<br>(-)', formula: 'Na<sub class="SubSet4">6</sub>MnTi<sub class="SubSet4">4</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">28</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,71' },
              { ime: 'Nahpoite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">3</sub>OH)', postotak: '0,71' },
              { ime: 'Peretaite<br>(-)', formula: 'CaSb<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>O<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,71' },
              { ime: 'Peterbaylissite<br>(-)', formula: 'Hg<sub class="SubSet4">3</sub>(CO<sub class="SubSet4">3</sub>)(OH) &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,71' },
              { ime: 'Alicewilsonite-(YCe)<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Sr<sub class="SubSet4">2</sub>YCe(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,70' },
              { ime: 'Alicewilsonite-(YLa)<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Sr<sub class="SubSet4">2</sub>YLa(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,70' },
              { ime: 'Armstrongite<br>(-)', formula: 'CaZr(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">15</sub>) &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,70' },
              { ime: 'Baumoite<br>(-)', formula: 'Ba<sub class="SubSet4">0.5</sub>[(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>O<sub class="SubSet4">8</sub>Mo<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">3</sub>](H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">3</sub>', postotak: '0,70' },
              { ime: 'Geschieberite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>(UO<sub class="SubSet4">2</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,70' },
              { ime: 'Ludjibaite<br>(-)', formula: 'Cu<sub class="SubSet4">5</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,70' },
              { ime: 'Masuyite<br>(-)', formula: 'Pb(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>O<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">2</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,70' },
              { ime: 'Metatyuyamunite<br>(-)', formula: 'Ca(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,70' },
              { ime: 'Plumbotsumite<br>(-)', formula: 'Pb<sub class="SubSet4">5</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">8</sub>(OH)<sub class="SubSet4">10</sub>', postotak: '0,70' },
              { ime: 'Pseudomalachite<br>(-)', formula: 'Cu<sub class="SubSet4">5</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,70' },
              { ime: 'Reichenbachite<br>(-)', formula: 'Cu<sub class="SubSet4">5</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,70' },
              { ime: 'Reppiaite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,70' },
              { ime: 'Swamboite-(Nd)<br>(-)', formula: 'Nd<sub class="SubSet4">0.333</sub>[(UO<sub class="SubSet4">2</sub>)(SiO<sub class="SubSet4">3</sub>OH)](H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">~2.5</sub>', postotak: '0,70' },
              { ime: 'Tancoite<br>(-)', formula: 'LiNa<sub class="SubSet4">2</sub>Al(PO<sub class="SubSet4">4</sub>)(PO<sub class="SubSet4">3</sub>OH)(OH)', postotak: '0,70' },
              { ime: 'Yingjiangite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>Ca(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">7</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">6</sub> &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,70' },
              { ime: 'Adolfpateraite<br>(-)', formula: 'K(UO<sub class="SubSet4">2</sub>)(SO<sub class="SubSet4">4</sub>)(OH)(H<sub class="SubSet4">2</sub>O)', postotak: '0,69' },
              { ime: 'Bassanite<br>(-)', formula: 'Ca(SO<sub class="SubSet4">4</sub>) &#183; 0.5H<sub class="SubSet4">2</sub>O', postotak: '0,69' },
              { ime: 'Bicchulite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>SiO<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,69' },
              { ime: 'Chenevixite<br>(-)', formula: 'CuFe<sup class="SupSet">3+</sup>(AsO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,69' },
              { ime: 'Derriksite<br>(-)', formula: 'Cu<sub class="SubSet4">4</sub>(UO<sub class="SubSet4">2</sub>)(Se<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub>', postotak: '0,69' },
              { ime: 'Euclase<br>(-)', formula: 'BeAlSiO<sub class="SubSet4">4</sub>(OH)', postotak: '0,69' },
              { ime: 'Ježekite<br>(-)', formula: 'Na<sub class="SubSet4">8</sub>[(UO<sub class="SubSet4">2</sub>)(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>](SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,69' },
              { ime: 'Kamaishilite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>(SiAl<sub class="SubSet4">2</sub>)O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,69' },
              { ime: 'Montebrasite<br>(-)', formula: 'LiAl(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,69' },
              { ime: 'Omongwaite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Ca<sub class="SubSet4">5</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,69' },
              { ime: 'Radovanite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>[As<sup class="SupSet">5+</sup>O<sub class="SubSet4">4</sub>][As<sup class="SupSet">3+</sup>O<sub class="SubSet4">2</sub>(OH)]<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,69' },
              { ime: 'Roeblingite<br>(-)', formula: 'Ca<sub class="SubSet4">6</sub>Mn<sup class="SupSet">2+</sup>Pb<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub>)<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,69' },
              { ime: 'Alumolukrahnite<br>(-)', formula: 'CaCu<sup class="SupSet">2+</sup>Al(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)(H<sub class="SubSet4">2</sub>O)', postotak: '0,68' },
              { ime: 'Carboirite<br>(-)', formula: 'Fe<sup class="SupSet">2+</sup>Al<sub class="SubSet4">2</sub>GeO<sub class="SubSet4">5</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,68' },
              { ime: 'Carlosbarbosaite<br>(-)', formula: '(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>Nb<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,68' },
              { ime: 'Kihlmanite-(Ce)<br>(-)', formula: 'Ce<sub class="SubSet4">2</sub>TiO<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">4</sub>)(HCO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(H<sub class="SubSet4">2</sub>O)', postotak: '0,68' },
              { ime: 'Schieffelinite<br>(-)', formula: 'Pb<sub class="SubSet4">10</sub>Te<sup class="SupSet">6+</sup><sub class="SubSet4">6</sub>O<sub class="SubSet4">20</sub>(OH)<sub class="SubSet4">14</sub>(SO<sub class="SubSet4">4</sub>)(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">5</sub>', postotak: '0,68' },
              { ime: 'Trolleite<br>(-)', formula: 'Al<sub class="SubSet4">4</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,68' },
              { ime: 'Zippeite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>[(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>](H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">4</sub>', postotak: '0,68' },
              { ime: 'Carnotite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,67' },
              { ime: 'Cebollite<br>(-)', formula: 'Ca<sub class="SubSet4">5</sub>Al<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,67' },
              { ime: 'Chromschieffelinite<br>(-)', formula: 'Pb<sub class="SubSet4">10</sub>Te<sup class="SupSet">6+</sup><sub class="SubSet4">6</sub>O<sub class="SubSet4">20</sub>(OH)<sub class="SubSet4">14</sub>(CrO<sub class="SubSet4">4</sub>)(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">5</sub>', postotak: '0,67' },
              { ime: 'Delindeite<br>(-)', formula: 'Ba<sub class="SubSet4">2</sub>Ti<sub class="SubSet4">2</sub>(Na<sub class="SubSet4">2</sub>◻)Ti(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>', postotak: '0,67' },
              { ime: 'Lazulite<br>(-)', formula: 'MgAl<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,67' },
              { ime: 'Mr&aacute;zekite<br>(-)', formula: 'Bi<sub class="SubSet4">2</sub>Cu<sub class="SubSet4">3</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,67' },
              { ime: 'Polyhalite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>Ca<sub class="SubSet4">2</sub>Mg(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,67' },
              { ime: 'Bertossaite<br>(-)', formula: 'Li<sub class="SubSet4">2</sub>CaAl<sub class="SubSet4">4</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,66' },
              { ime: 'Calcioancylite-(Nd)<br>(-)', formula: 'Nd<sub class="SubSet4">2.8</sub>Ca<sub class="SubSet4">1.2</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">3</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,66' },
              { ime: 'Cumengeite<br>(-)', formula: 'Pb<sub class="SubSet4">21</sub>Cu<sub class="SubSet4">20</sub>Cl<sub class="SubSet4">42</sub>(OH)<sub class="SubSet4">40</sub> &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,66' },
              { ime: 'Dumontite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>O<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 5H<sub class="SubSet4">2</sub>O', postotak: '0,66' },
              { ime: 'Krausite<br>(-)', formula: 'KFe<sup class="SupSet">3+</sup>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,66' },
              { ime: 'Lislkirchnerite<br>(-)', formula: 'Pb<sub class="SubSet4">6</sub>Al(OH)<sub class="SubSet4">8</sub>Cl<sub class="SubSet4">2</sub>(NO<sub class="SubSet4">3</sub>)<sub class="SubSet4">5</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,66' },
              { ime: 'Paulscherrerite<br>(-)', formula: '(UO<sub class="SubSet4">2</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,66' },
              { ime: 'Zhenruite<br>(-)', formula: '(MoO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,66' },
              { ime: 'Arsenoclasite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,65' },
              { ime: 'Diaboleite<br>(-)', formula: 'CuPb<sub class="SubSet4">2</sub>Cl<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,65' },
              { ime: 'Dietzeite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>(IO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(CrO<sub class="SubSet4">4</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,65' },
              { ime: 'Hodgkinsonite<br>(-)', formula: 'Zn<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup>(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,65' },
              { ime: 'Hydroxylgugiaite<br>(-)', formula: '(Ca<sub class="SubSet4">3</sub>◻)<sub class="SubSet4">&Sigma;4</sub>(Si<sub class="SubSet4">3.5</sub>Be<sub class="SubSet4">2.5</sub>)<sub class="SubSet4">&Sigma;6</sub>O<sub class="SubSet4">11</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,65' },
              { ime: 'Kolicite<br>(-)', formula: 'Zn<sub class="SubSet4">4</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">7</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">8</sub>', postotak: '0,65' },
              { ime: '&Scaron;reinite<br>(-)', formula: 'Pb(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">4</sub>(BiO)<sub class="SubSet4">3</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">7</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,65' },
              { ime: 'Turanite<br>(-)', formula: 'Cu<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,65' },
              { ime: 'Yakovenchukite-(Y)<br>(-)', formula: 'K<sub class="SubSet4">3</sub>NaCaY<sub class="SubSet4">2</sub>Si<sub class="SubSet4">12</sub>O<sub class="SubSet4">30</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,65' },
              { ime: 'Deloryite<br>(-)', formula: 'Cu<sub class="SubSet4">4</sub>(UO<sub class="SubSet4">2</sub>)Mo<sub class="SubSet4">2</sub>O<sub class="SubSet4">8</sub>(OH)<sub class="SubSet4">6</sub>', postotak: '0,64' },
              { ime: 'Ferrilotharmeyerite<br>(-)', formula: 'CaZnFe<sup class="SupSet">3+</sup>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,64' },
              { ime: 'Bainbridgeite-(YCe)<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Ba<sub class="SubSet4">2</sub>YCe(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,63' },
              { ime: 'Bartelkeite<br>(-)', formula: 'PbFe<sup class="SupSet">2+</sup>Ge(Ge<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,63' },
              { ime: 'Chinleite-(Y)<br>(-)', formula: 'NaY(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,63' },
              { ime: 'Cobalttsumcorite<br>(-)', formula: 'PbCo<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,63' },
              { ime: 'Datolite<br>(-)', formula: 'CaB(SiO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,63' },
              { ime: 'Evdokimovite<br>(-)', formula: 'Tl<sub class="SubSet4">4</sub>(VO)<sub class="SubSet4">3</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">5</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">5</sub>', postotak: '0,63' },
              { ime: 'Hydroxylherderite<br>(-)', formula: 'CaBe(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,63' },
              { ime: 'Hydroxylwagnerite<br>(-)', formula: 'Mg<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,63' },
              { ime: 'Kannanite<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Al<sub class="SubSet4">4</sub>(MgAl)(VO<sub class="SubSet4">4</sub>)(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub>)(OH)<sub class="SubSet4">6</sub>', postotak: '0,63' },
              { ime: 'Leightonite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>Ca<sub class="SubSet4">2</sub>Cu(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,63' },
              { ime: 'Nalivkinite<br>(-)', formula: 'Li<sub class="SubSet4">2</sub>NaFe<sup class="SupSet">2+</sup><sub class="SubSet4">7</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>F(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,63' },
              { ime: 'Rappoldite<br>(-)', formula: 'PbCo<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,63' },
              { ime: 'Schuilingite-(Nd)<br>(-)', formula: 'CuPbNd(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH) &#183; 1.5H<sub class="SubSet4">2</sub>O', postotak: '0,63' },
              { ime: 'Terskite<br>(-)', formula: 'Na<sub class="SubSet4">4</sub>ZrSi<sub class="SubSet4">6</sub>O<sub class="SubSet4">16</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,63' },
              { ime: 'Akatoreite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">9</sub>Al<sub class="SubSet4">2</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">24</sub>(OH)<sub class="SubSet4">8</sub>', postotak: '0,62' },
              { ime: 'Artroeite<br>(-)', formula: 'PbAlF<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,62' },
              { ime: 'Asselbornite<br>(-)', formula: 'Pb(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">4</sub>(BiO)<sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">7</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,62' },
              { ime: 'Cerchiaraite-(Al)<br>(-)', formula: 'Ba<sub class="SubSet4">4</sub>Al<sub class="SubSet4">4</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>Cl<sub class="SubSet4">2</sub>[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">4</sub>]', postotak: '0,62' },
              { ime: 'Helmutwinklerite<br>(-)', formula: 'PbZn<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,62' },
              { ime: 'H&uuml;gelite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub> &#183; 5H<sub class="SubSet4">2</sub>O', postotak: '0,62' },
              { ime: 'Jingwenite-(Y)<br>(-)', formula: 'YAlV<sup class="SupSet">4+</sup>(SiO<sub class="SubSet4">4</sub>)O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,62' },
              { ime: 'Mckelveyite-(Y)<br>(-)', formula: 'NaBa<sub class="SubSet4">3</sub>CaY(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,62' },
              { ime: 'Sazhinite-(Ce)<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>CeSi<sub class="SubSet4">6</sub>O<sub class="SubSet4">15</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,62' },
              { ime: 'Sazhinite-(La)<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>LaSi<sub class="SubSet4">6</sub>O<sub class="SubSet4">15</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,62' },
              { ime: 'Thometzekite<br>(-)', formula: 'PbCu<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,62' },
              { ime: 'Tivanite<br>(-)', formula: 'TiV<sup class="SupSet">3+</sup>O<sub class="SubSet4">3</sub>(OH)', postotak: '0,62' },
              { ime: 'Tsumcorite<br>(-)', formula: 'PbZn<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,62' },
              { ime: 'Alcaparrosaite<br>(-)', formula: 'K<sub class="SubSet4">3</sub>Ti<sup class="SupSet">4+</sup>Fe<sup class="SupSet">3+</sup>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>O(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,61' },
              { ime: 'Cancrisilite<br>(-)', formula: 'Na<sub class="SubSet4">7</sub>(Si<sub class="SubSet4">7</sub>Al<sub class="SubSet4">5</sub>)O<sub class="SubSet4">24</sub>(CO<sub class="SubSet4">3</sub>) &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,61' },
              { ime: 'Cornubite<br>(-)', formula: 'Cu<sub class="SubSet4">5</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,61' },
              { ime: 'Cornwallite<br>(-)', formula: 'Cu<sub class="SubSet4">5</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,61' },
              { ime: 'Erythrosiderite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>Cl<sub class="SubSet4">5</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,61' },
              { ime: 'Heyerdahlite<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>Mn<sub class="SubSet4">7</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>F(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,61' },
              { ime: 'Hilgardite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>B<sub class="SubSet4">5</sub>O<sub class="SubSet4">9</sub>Cl &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,61' },
              { ime: 'Misenite<br>(-)', formula: 'K<sub class="SubSet4">8</sub>(SO<sub class="SubSet4">4</sub>)(SO<sub class="SubSet4">3</sub>OH)<sub class="SubSet4">6</sub>', postotak: '0,61' },
              { ime: 'Palermoite<br>(-)', formula: 'Li<sub class="SubSet4">2</sub>SrAl<sub class="SubSet4">4</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,61' },
              { ime: 'Pollucite<br>(-)', formula: 'Cs(Si<sub class="SubSet4">2</sub>Al)O<sub class="SubSet4">6</sub> &#183; nH<sub class="SubSet4">2</sub>O', postotak: '0,61' },
              { ime: 'Syngenite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>Ca(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,61' },
              { ime: 'Tianhongqiite<br>(-)', formula: 'CrTiO<sub class="SubSet4">3</sub>(OH)', postotak: '0,61' },
              { ime: 'Emmonsite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(Te<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,60' },
              { ime: 'Gysinite-(Ce)<br>(-)', formula: 'PbCe(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)(H<sub class="SubSet4">2</sub>O)', postotak: '0,60' },
              { ime: 'Gysinite-(La)<br>(-)', formula: 'PbLa(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,60' },
              { ime: 'Gysinite-(Nd)<br>(-)', formula: 'PbNd(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,60' },
              { ime: 'Hayelasdiite<br>(-)', formula: '[Pb<sub class="SubSet4">4</sub>O<sub class="SubSet4">1.5</sub>(OH)<sub class="SubSet4">2.5</sub>]<sub class="SubSet4">2</sub>[Cu<sup class="SupSet">1+</sup><sub class="SubSet4">5</sub>(S<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>(S<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>OH)<sub class="SubSet4">2</sub>(H<sub class="SubSet4">2</sub>O)] &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,60' },
              { ime: 'Santaclaraite<br>(-)', formula: 'CaMn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">14</sub>(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,60' },
              { ime: 'Scorzalite<br>(-)', formula: 'Fe<sup class="SupSet">2+</sup>Al<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,60' },
              { ime: 'Selwynite<br>(-)', formula: 'NaKBeZr<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,60' },
              { ime: 'Sheldrickite<br>(-)', formula: 'NaCa<sub class="SubSet4">3</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>F<sub class="SubSet4">3</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,60' },
              { ime: 'Soddyite<br>(-)', formula: '(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">4</sub>)(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,60' },
              { ime: 'Sursassite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Al<sub class="SubSet4">3</sub>(SiO<sub class="SubSet4">4</sub>)(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(OH)<sub class="SubSet4">3</sub>', postotak: '0,60' },
              { ime: 'Xuite<br>(-)', formula: 'Ca<sub class="SubSet4">3</sub>Fe<sub class="SubSet4">2</sub>[AlO<sub class="SubSet4">3</sub>(OH)]<sub class="SubSet4">3</sub>', postotak: '0,60' },
              { ime: 'Ardennite-(V)<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Al<sub class="SubSet4">4</sub>(AlMg)(VO<sub class="SubSet4">4</sub>)(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub>)(OH)<sub class="SubSet4">6</sub>', postotak: '0,59' },
              { ime: 'Bainbridgeite-(NdCe)<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Ba<sub class="SubSet4">2</sub>NdCe(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,59' },
              { ime: 'Cirrolite<br>(-)', formula: 'Ca<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,59' },
              { ime: 'Fabianite<br>(-)', formula: 'CaB<sub class="SubSet4">3</sub>O<sub class="SubSet4">5</sub>(OH)', postotak: '0,59' },
              { ime: 'Hydroxylchondrodite<br>(-)', formula: 'Mg<sub class="SubSet4">5</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,59' },
              { ime: 'Kalyuzhnyite-(Ce)<br>(-)', formula: 'NaKCaSrCeTi(Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">21</sub>)OF(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">3</sub>', postotak: '0,59' },
              { ime: 'Lavoisierite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">8</sub>[Al<sub class="SubSet4">10</sub>(Mn<sup class="SupSet">3+</sup>Mg)][Si<sub class="SubSet4">11</sub>P]O<sub class="SubSet4">44</sub>(OH)<sub class="SubSet4">12</sub>', postotak: '0,59' },
              { ime: 'Lemanskiite<br>(-)', formula: 'NaCaCu<sub class="SubSet4">5</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>Cl &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,59' },
              { ime: 'Mckelveyite-(Nd)<br>(-)', formula: 'NaCaBa<sub class="SubSet4">3</sub>Nd(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,59' },
              { ime: 'Alpeite<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Mn<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>(Mn<sup class="SupSet">3+</sup>Mg)(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub>)(VO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">6</sub>', postotak: '0,58' },
              { ime: 'Ardennite-(As)<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Al<sub class="SubSet4">4</sub>(AlMg)(AsO<sub class="SubSet4">4</sub>)(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub>)(OH)<sub class="SubSet4">6</sub>', postotak: '0,58' },
              { ime: 'Azurite<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,58' },
              { ime: 'Blatonite<br>(-)', formula: '(UO<sub class="SubSet4">2</sub>)(CO<sub class="SubSet4">3</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,58' },
              { ime: 'Cassagnaite<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>V<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub>O<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub>)(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>', postotak: '0,58' },
              { ime: 'Coffinite<br>(-)', formula: 'U(SiO<sub class="SubSet4">4</sub>) &#183; nH<sub class="SubSet4">2</sub>O', postotak: '0,58' },
              { ime: 'Natropalermoite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>SrAl<sub class="SubSet4">4</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,58' },
              { ime: 'Tavorite<br>(-)', formula: 'LiFe<sup class="SupSet">3+</sup>(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,58' },
              { ime: 'Wenlanzhangite-(Y)<br>(-)', formula: 'Y<sub class="SubSet4">2</sub>V<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>V<sup class="SupSet">4+</sup><sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,58' },
              { ime: 'Cerchiaraite-(Fe)<br>(-)', formula: 'Ba<sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>Cl<sub class="SubSet4">2</sub>[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">4</sub>]', postotak: '0,57' },
              { ime: 'Cerchiaraite-(Mn)<br>(-)', formula: 'Ba<sub class="SubSet4">4</sub>Mn<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>Cl<sub class="SubSet4">2</sub>[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">4</sub>]', postotak: '0,57' },
              { ime: 'Frankhawthorneite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>Te<sup class="SupSet">6+</sup>O<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,57' },
              { ime: 'Panasqueiraite<br>(-)', formula: 'CaMg(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,57' },
              { ime: 'V&auml;yrynenite<br>(-)', formula: 'BeMn<sup class="SupSet">2+</sup>(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,57' },
              { ime: 'Vuagnatite<br>(-)', formula: 'CaAlSiO<sub class="SubSet4">4</sub>(OH)', postotak: '0,57' },
              { ime: 'Junitoite<br>(-)', formula: 'CaZn<sub class="SubSet4">2</sub>Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,56' },
              { ime: 'Metadelrioite<br>(-)', formula: 'SrCa(VO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,56' },
              { ime: 'Nafertisite<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">10</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">17</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub>F(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,56' },
              { ime: 'Pyrophyllite<br>(-)', formula: 'Al<sub class="SubSet4">2</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,56' },
              { ime: 'S&oslash;rensenite<br>(-)', formula: 'Na<sub class="SubSet4">4</sub>Be<sub class="SubSet4">2</sub>Sn(Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,56' },
              { ime: 'Weilite<br>(-)', formula: 'Ca(AsO<sub class="SubSet4">3</sub>OH)', postotak: '0,56' },
              { ime: 'Bayldonite<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>PbO(AsO<sub class="SubSet4">3</sub>OH)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,55' },
              { ime: 'Dovyrenite<br>(-)', formula: 'Ca<sub class="SubSet4">6</sub>Zr(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,55' },
              { ime: 'Elyite<br>(-)', formula: 'CuPb<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">4</sub>)O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,55' },
              { ime: 'Kolfanite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>O<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,55' },
              { ime: 'Loomisite<br>(-)', formula: 'Ba[Be<sub class="SubSet4">2</sub>P<sub class="SubSet4">2</sub>O<sub class="SubSet4">8</sub>] &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,55' },
              { ime: 'Rogermitchellite<br>(-)', formula: 'Na<sub class="SubSet4">6</sub>Sr<sub class="SubSet4">12</sub>Ba<sub class="SubSet4">2</sub>Zr<sub class="SubSet4">13</sub>Si<sub class="SubSet4">39</sub>B<sub class="SubSet4">6</sub>O<sub class="SubSet4">123</sub>(OH)<sub class="SubSet4">14</sub> &#183; 10H<sub class="SubSet4">2</sub>O', postotak: '0,55' },
              { ime: 'Rosenhahnite<br>(-)', formula: 'Ca<sub class="SubSet4">3</sub>Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">8</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,55' },
              { ime: 'Shuiskite-(Cr)<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>CrCr<sub class="SubSet4">2</sub>[SiO<sub class="SubSet4">4</sub>][Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(OH)](OH)<sub class="SubSet4">2</sub>O', postotak: '0,55' },
              { ime: 'Calcioandyrobertsite<br>(-)', formula: 'KCaCu<sub class="SubSet4">5</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>[As(OH)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>] &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,54' },
              { ime: 'Fluorkyuygenite<br>(-)', formula: 'Ca<sub class="SubSet4">12</sub>Al<sub class="SubSet4">14</sub>O<sub class="SubSet4">32</sub>[(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">4</sub>F<sub class="SubSet4">2</sub>]', postotak: '0,54' },
              { ime: 'Julgoldite-(Fe<sup class="SupSet">3+</sup>)<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)O(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,54' },
              { ime: 'Kamenevite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>TiSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,54' },
              { ime: 'Lussierite<br>(-)', formula: 'Na<sub class="SubSet4">10</sub>[(UO<sub class="SubSet4">2</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>](SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">3</sub>', postotak: '0,54' },
              { ime: 'Macfallite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(SiO<sub class="SubSet4">4</sub>)(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(OH)<sub class="SubSet4">3</sub>', postotak: '0,54' },
              { ime: 'Rouseite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup>(AsO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,54' },
              { ime: 'Wickenburgite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>CaAl<sub class="SubSet4">2</sub>Si<sub class="SubSet4">10</sub>O<sub class="SubSet4">27</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,54' },
              { ime: 'Yuchuanite-(Y)<br>(-)', formula: 'Y<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,54' },
              { ime: 'Boromuscovite<br>(-)', formula: 'KAl<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">3</sub>B)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,53' },
              { ime: 'Chinleite-(Nd)<br>(-)', formula: 'NaNd(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,53' },
              { ime: 'Chlorkyuygenite<br>(-)', formula: 'Ca<sub class="SubSet4">12</sub>Al<sub class="SubSet4">14</sub>O<sub class="SubSet4">32</sub>[(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">4</sub>Cl<sub class="SubSet4">2</sub>]', postotak: '0,53' },
              { ime: 'Kurgantaite<br>(-)', formula: 'CaSrB<sub class="SubSet4">5</sub>O<sub class="SubSet4">9</sub>Cl &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,53' },
              { ime: 'Paragonite<br>(-)', formula: 'NaAl<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">3</sub>Al)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,53' },
              { ime: 'Penikisite<br>(-)', formula: 'BaMg<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,53' },
              { ime: 'Sharpite<br>(-)', formula: 'Ca(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,53' },
              { ime: 'Talc<br>(-)', formula: 'Mg<sub class="SubSet4">3</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,53' },
              { ime: 'Uduminelite<br>(-)', formula: 'Ca<sub class="SubSet4">3</sub>Al<sub class="SubSet4">8</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">12</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,53' },
              { ime: 'Ashburtonite<br>(-)', formula: 'HCu<sub class="SubSet4">4</sub>Pb<sub class="SubSet4">4</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>(HCO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub>Cl', postotak: '0,52' },
              { ime: 'Bityite<br>(-)', formula: 'CaLiAl<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>BeAl)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,52' },
              { ime: 'Ephesite<br>(-)', formula: 'NaLiAl<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,52' },
              { ime: 'Plancheite<br>(-)', formula: 'Cu<sub class="SubSet4">8</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">11</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,52' },
              { ime: 'Truscottite<br>(-)', formula: 'Ca<sub class="SubSet4">14</sub>Si<sub class="SubSet4">24</sub>O<sub class="SubSet4">58</sub>(OH)<sub class="SubSet4">8</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,52' },
              { ime: 'Veblenite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>◻<sub class="SubSet4">2</sub>Na(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>Mn<sub class="SubSet4">7</sub>◻)Nb<sub class="SubSet4">3</sub>Ti(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">10</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">3</sub>', postotak: '0,52' },
              { ime: 'Barbosalite<br>(-)', formula: 'Fe<sup class="SupSet">2+</sup>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,51' },
              { ime: 'Calcinaksite<br>(-)', formula: 'KNaCa(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,51' },
              { ime: 'Chenite<br>(-)', formula: 'CuPb<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub>', postotak: '0,51' },
              { ime: 'Gottlobite<br>(-)', formula: 'CaMg(VO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,51' },
              { ime: 'Killalaite<br>(-)', formula: 'Ca<sub class="SubSet4">6.4</sub>[H<sub class="SubSet4">0.6</sub>Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>]<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,51' },
              { ime: 'Lipscombite<br>(-)', formula: 'Fe<sup class="SupSet">2+</sup>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,51' },
              { ime: 'Luanshiweiite<br>(-)', formula: 'KLiAl<sub class="SubSet4">1.5</sub>(Si<sub class="SubSet4">3.5</sub>Al<sub class="SubSet4">0.5</sub>)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,51' },
              { ime: 'Margarite<br>(-)', formula: 'CaAl<sub class="SubSet4">2</sub>Si<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,51' },
              { ime: 'Muscovite<br>(-)', formula: 'KAl<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">3</sub>Al)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,51' },
              { ime: 'Sayrite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">5</sub>O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">2</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,51' },
              { ime: 'Zincochenite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>Zn(OH)<sub class="SubSet4">6</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>', postotak: '0,51' },
              { ime: 'Andyrobertsite<br>(-)', formula: 'KCdCu<sub class="SubSet4">5</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>[As(OH)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>] &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,50' },
              { ime: 'Aspidolite<br>(-)', formula: 'NaMg<sub class="SubSet4">3</sub>(Si<sub class="SubSet4">3</sub>Al)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,50' },
              { ime: 'Fukalite<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(CO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,50' },
              { ime: 'Hentschelite<br>(-)', formula: 'CuFe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,50' },
              { ime: 'Linarite<br>(-)', formula: 'CuPb(SO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,50' },
              { ime: 'Ottensite<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>(Sb<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(SbS<sub class="SubSet4">3</sub>) &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,50' },
              { ime: 'Preiswerkite<br>(-)', formula: 'NaAlMg<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,50' },
              { ime: 'Steedeite<br>(-)', formula: 'NaMn<sub class="SubSet4">2</sub>[Si<sub class="SubSet4">3</sub>BO<sub class="SubSet4">9</sub>](OH)<sub class="SubSet4">2</sub>', postotak: '0,50' },
              { ime: 'Yancowinnaite<br>(-)', formula: 'PbCuAl(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>OH &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,50' },
              { ime: 'Zinclipscombite<br>(-)', formula: 'ZnFe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,50' },
              { ime: 'Astrocyanite-(Ce)<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>Ce<sub class="SubSet4">2</sub>(UO<sub class="SubSet4">2</sub>)(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">5</sub>(OH)<sub class="SubSet4">2</sub> &#183; 1.5H<sub class="SubSet4">2</sub>O', postotak: '0,49' },
              { ime: 'Bergslagite<br>(-)', formula: 'CaBe(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,49' },
              { ime: 'Diversilite-(Ce)<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Ba<sub class="SubSet4">6</sub>Ce<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup>Ti<sub class="SubSet4">3</sub>Si<sub class="SubSet4">12</sub>O<sub class="SubSet4">36</sub>(OH)<sub class="SubSet4">10</sub> &#183; nH<sub class="SubSet4">2</sub>O', postotak: '0,49' },
              { ime: 'Hingganite-(Y)<br>(-)', formula: 'BeY(SiO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,49' },
              { ime: 'Jagowerite<br>(-)', formula: 'BaAl<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,49' },
              { ime: 'Juabite<br>(-)', formula: 'CaCu<sub class="SubSet4">10</sub>(Te<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,49' },
              { ime: 'Mozartite<br>(-)', formula: 'CaMn<sup class="SupSet">3+</sup>(SiO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,49' },
              { ime: 'Prehnite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Al(Si<sub class="SubSet4">3</sub>Al)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,49' },
              { ime: 'W&ouml;lsendorfite<br>(-)', formula: 'Pb<sub class="SubSet4">7</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">14</sub>O<sub class="SubSet4">19</sub>(OH)<sub class="SubSet4">4</sub> &#183; 12H<sub class="SubSet4">2</sub>O', postotak: '0,49' },
              { ime: 'Aminoffite<br>(-)', formula: 'Ca<sub class="SubSet4">3</sub>(BeOH)<sub class="SubSet4">2</sub>Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub>', postotak: '0,48' },
              { ime: 'Armbrusterite<br>(-)', formula: 'Na<sub class="SubSet4">6</sub>K<sub class="SubSet4">5</sub>Mn<sup class="SupSet">3+</sup>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">14</sub>(Si<sub class="SubSet4">9</sub>O<sub class="SubSet4">22</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">10</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,48' },
              { ime: 'Cetineite<br>(-)', formula: 'NaK<sub class="SubSet4">5</sub>Sb<sub class="SubSet4">14</sub>S<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">6</sub>', postotak: '0,48' },
              { ime: 'Chromceladonite<br>(-)', formula: 'KMgCr(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,48' },
              { ime: 'Clintonite<br>(-)', formula: 'CaAlMg<sub class="SubSet4">2</sub>(SiAl<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,48' },
              { ime: 'Eastonite<br>(-)', formula: 'KAlMg<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,48' },
              { ime: 'Ferripyrophyllite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup>Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">5</sub>(OH)', postotak: '0,48' },
              { ime: 'Ferrisurite<br>(-)', formula: 'Pb<sub class="SubSet4">2.4</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">1.7</sub>(OH)<sub class="SubSet4">3</sub> &#183; nH<sub class="SubSet4">2</sub>O', postotak: '0,48' },
              { ime: 'Foshagite<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>(SiO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,48' },
              { ime: 'Hydroromarchite<br>(-)', formula: 'Sn<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,48' },
              { ime: 'Kostylevite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>ZrSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,48' },
              { ime: 'Munakataite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Cu<sub class="SubSet4">2</sub>(Se<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)(SO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">4</sub>', postotak: '0,48' },
              { ime: 'Phlogopite<br>(-)', formula: 'KMg<sub class="SubSet4">3</sub>(AlSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,48' },
              { ime: 'Reinhardbraunsite<br>(-)', formula: 'Ca<sub class="SubSet4">5</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,48' },
              { ime: 'Scawtite<br>(-)', formula: 'Ca<sub class="SubSet4">7</sub>(Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub>)<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>) &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,48' },
              { ime: 'Tisinalite<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>Mn<sup class="SupSet">2+</sup>TiSi<sub class="SubSet4">6</sub>O<sub class="SubSet4">15</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,48' },
              { ime: 'Trabzonite<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>[Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub>(OH)](OH)', postotak: '0,48' },
              { ime: 'Umbite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>ZrSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,48' },
              { ime: 'Witzkeite<br>(-)', formula: 'Na<sub class="SubSet4">4</sub>K<sub class="SubSet4">4</sub>Ca(NO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,48' },
              { ime: 'Bjarebyite<br>(-)', formula: 'BaMn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,47' },
              { ime: 'Bohuslavite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(SO<sub class="SubSet4">4</sub>)(OH) &#183; <em>n</em>H<sub class="SubSet4">2</sub>O (15&le;<em>n</em>&le;24)', postotak: '0,47' },
              { ime: 'Celadonite<br>(-)', formula: 'KMgFe<sup class="SupSet">3+</sup>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,47' },
              { ime: 'Deerite<br>(-)', formula: 'Fe<sup class="SupSet">2+</sup><sub class="SubSet4">6</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">17</sub>)O<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">5</sub>', postotak: '0,47' },
              { ime: 'Ferroaluminoceladonite<br>(-)', formula: 'KFe<sup class="SupSet">2+</sup>AlSi<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,47' },
              { ime: 'Gartrellite<br>(-)', formula: 'PbCuFe<sup class="SupSet">3+</sup>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,47' },
              { ime: 'Guilleminite<br>(-)', formula: 'Ba(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>(Se<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,47' },
              { ime: 'Hermannroseite<br>(-)', formula: 'CaCu(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,47' },
              { ime: 'Hydroxylbastn&auml;site-(La)<br>(-)', formula: 'La(CO<sub class="SubSet4">3</sub>)(OH)', postotak: '0,47' },
              { ime: 'Kozoite-(La)<br>(-)', formula: 'La(CO<sub class="SubSet4">3</sub>)(OH)', postotak: '0,47' },
              { ime: 'Kulanite<br>(-)', formula: 'BaFe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,47' },
              { ime: 'Manganiceladonite<br>(-)', formula: 'KMgMn<sup class="SupSet">3+</sup>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,47' },
              { ime: 'Nickelschneebergite<br>(-)', formula: 'BiNi<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,47' },
              { ime: 'Schneebergite<br>(-)', formula: 'BiCo<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,47' },
              { ime: 'Strontioperloffite<br>(-)', formula: 'SrMn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,47' },
              { ime: 'Adelite<br>(-)', formula: 'CaMg(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,46' },
              { ime: 'Ashcroftine-(Y)<br>(-)', formula: 'K<sub class="SubSet4">5</sub>Na<sub class="SubSet4">5</sub>Y<sub class="SubSet4">12</sub>Si<sub class="SubSet4">28</sub>O<sub class="SubSet4">70</sub>(OH)<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">8</sub> &#183; 8H<sub class="SubSet4">2</sub>O', postotak: '0,46' },
              { ime: 'Demesmaekerite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Cu<sub class="SubSet4">5</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>(Se<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">6</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,46' },
              { ime: 'Ferriprehnite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>(AlSi<sub class="SubSet4">3</sub>)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,46' },
              { ime: 'Franciscanite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">6</sub>(V<sup class="SupSet">5+</sup>◻)(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,46' },
              { ime: 'Fuettererite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>Cu<sup class="SupSet">2+</sup><sub class="SubSet4">6</sub>Te<sup class="SupSet">6+</sup>O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">7</sub>Cl<sub class="SubSet4">5</sub>', postotak: '0,46' },
              { ime: 'Hydroxylbastn&auml;site-(Ce)<br>(-)', formula: 'Ce(CO<sub class="SubSet4">3</sub>)(OH)', postotak: '0,46' },
              { ime: 'Hydroxylbastn&auml;site-(Nd)<br>(-)', formula: 'Nd(CO<sub class="SubSet4">3</sub>)(OH)', postotak: '0,46' },
              { ime: 'Ilsemannite<br>(-)', formula: 'Mo<sub class="SubSet4">3</sub>O<sub class="SubSet4">8</sub> &#183; nH<sub class="SubSet4">2</sub>O (?)', postotak: '0,46' },
              { ime: 'Jadarite<br>(-)', formula: 'LiNaB<sub class="SubSet4">3</sub>SiO<sub class="SubSet4">7</sub>(OH)', postotak: '0,46' },
              { ime: 'Kozoite-(Nd)<br>(-)', formula: 'Nd(CO<sub class="SubSet4">3</sub>)(OH)', postotak: '0,46' },
              { ime: 'Lovozerite<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>CaZrSi<sub class="SubSet4">6</sub>O<sub class="SubSet4">15</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,46' },
              { ime: 'Schmiederite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>Pb<sub class="SubSet4">2</sub>(Se<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)(Se<sup class="SupSet">6+</sup>O<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">4</sub>', postotak: '0,46' },
              { ime: 'Tiettaite<br>(-)', formula: 'K<sub class="SubSet4">4</sub>Na<sub class="SubSet4">12</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Si<sub class="SubSet4">16</sub>O<sub class="SubSet4">41</sub>(OH)<sub class="SubSet4">4</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,46' },
              { ime: 'Vandermeerscheite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>[(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>V<sub class="SubSet4">2</sub>O<sub class="SubSet4">8</sub>] &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,46' },
              { ime: 'Yttrotungstite-(Ce)<br>(-)', formula: 'CeW<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,46' },
              { ime: 'Bluelizardite<br>(-)', formula: 'Na<sub class="SubSet4">7</sub>(UO<sub class="SubSet4">2</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>Cl(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,45' },
              { ime: 'Borzęckiite<br>(-)', formula: 'Pb(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>(SeO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,45' },
              { ime: 'Chromphyllite<br>(-)', formula: 'KCr<sub class="SubSet4">2</sub>(AlSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,45' },
              { ime: 'Franksousaite<br>(-)', formula: 'PbCu(Se<sup class="SupSet">6+</sup>O<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,45' },
              { ime: 'Garrelsite<br>(-)', formula: 'NaBa<sub class="SubSet4">3</sub>B<sub class="SubSet4">7</sub>Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">16</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,45' },
              { ime: 'Roscoelite<br>(-)', formula: 'KV<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(Si<sub class="SubSet4">3</sub>Al)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,45' },
              { ime: 'Tetraferriphlogopite<br>(-)', formula: 'KMg<sub class="SubSet4">3</sub>(Si<sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup>)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,45' },
              { ime: 'Tianhuixinite<br>(-)', formula: '(MoO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,45' },
              { ime: 'Triploidite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,45' },
              { ime: 'Wolfeite<br>(-)', formula: 'Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,45' },
              { ime: 'Boleite<br>(-)', formula: 'KAg<sub class="SubSet4">9</sub>Pb<sub class="SubSet4">26</sub>Cu<sub class="SubSet4">24</sub>Cl<sub class="SubSet4">62</sub>(OH)<sub class="SubSet4">48</sub>', postotak: '0,44' },
              { ime: 'Ferroceladonite<br>(-)', formula: 'KFe<sup class="SupSet">2+</sup>Fe<sup class="SupSet">3+</sup>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,44' },
              { ime: 'Groatite<br>(-)', formula: '◻NaCaMn<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)(HPO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>', postotak: '0,44' },
              { ime: 'Manganlotharmeyerite<br>(-)', formula: 'CaMn<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,44' },
              { ime: 'Perloffite<br>(-)', formula: 'BaMn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,44' },
              { ime: 'Pseudoboleite<br>(-)', formula: 'Pb<sub class="SubSet4">31</sub>Cu<sub class="SubSet4">24</sub>Cl<sub class="SubSet4">62</sub>(OH)<sub class="SubSet4">48</sub>', postotak: '0,44' },
              { ime: 'Rossmanite<br>(-)', formula: '◻(Al<sub class="SubSet4">2</sub>Li)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>(OH)', postotak: '0,44' },
              { ime: 'Drugmanite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>(PO<sub class="SubSet4">4</sub>)(PO<sub class="SubSet4">3</sub>OH)(OH)<sub class="SubSet4">2</sub>', postotak: '0,43' },
              { ime: 'Elbaite<br>(-)', formula: 'Na(Al<sub class="SubSet4">1.5</sub>Li<sub class="SubSet4">1.5</sub>)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>(OH)', postotak: '0,43' },
              { ime: 'Hydroredmondite<br>(-)', formula: '[Pb<sub class="SubSet4">8</sub>O<sub class="SubSet4">2</sub>Zn(OH)<sub class="SubSet4">6</sub>](S<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,43' },
              { ime: 'Johntomaite<br>(-)', formula: 'BaFe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,43' },
              { ime: 'Kalborsite<br>(-)', formula: 'K<sub class="SubSet4">6</sub>Al<sub class="SubSet4">4</sub>BSi<sub class="SubSet4">6</sub>O<sub class="SubSet4">20</sub>(OH)<sub class="SubSet4">4</sub>Cl', postotak: '0,43' },
              { ime: 'Magnesio-foitite<br>(-)', formula: '◻(Mg<sub class="SubSet4">2</sub>Al)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>(OH)', postotak: '0,43' },
              { ime: 'Mathesiusite<br>(-)', formula: 'K<sub class="SubSet4">5</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(VO<sub class="SubSet4">5</sub>)(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">4</sub>', postotak: '0,43' },
              { ime: 'Minnesotaite<br>(-)', formula: 'Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,43' },
              { ime: 'Sewardite<br>(-)', formula: 'CaFe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,43' },
              { ime: 'Tangeite<br>(-)', formula: 'CaCu(VO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,43' },
              { ime: 'Abhurite<br>(-)', formula: 'Sn<sup class="SupSet">2+</sup><sub class="SubSet4">21</sub>O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">14</sub>Cl<sub class="SubSet4">16</sub>', postotak: '0,42' },
              { ime: 'Aluminocerite-(CeCa)<br>(-)', formula: '(Ce<sub class="SubSet4">6</sub>Ca<sub class="SubSet4">3</sub>)◻Al(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(SiO<sub class="SubSet4">3</sub>OH)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,42' },
              { ime: 'Daubr&eacute;eite<br>(-)', formula: 'BiO(OH)', postotak: '0,42' },
              { ime: 'Dravite<br>(-)', formula: 'NaMg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>(OH)', postotak: '0,42' },
              { ime: 'Hydrokenoelsmoreite<br>(-)', formula: '◻<sub class="SubSet4">2</sub>W<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(H<sub class="SubSet4">2</sub>O)', postotak: '0,42' },
              { ime: 'Libethenite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,42' },
              { ime: 'Siderophyllite<br>(-)', formula: 'KFe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Al(Si<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,42' },
              { ime: 'Tarbuttite<br>(-)', formula: 'Zn<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,42' },
              { ime: 'Tassieite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>Mg<sub class="SubSet4">3</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,42' },
              { ime: 'Willemseite<br>(-)', formula: 'Ni<sub class="SubSet4">3</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,42' },
              { ime: 'Zincolibethenite<br>(-)', formula: 'CuZn(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,42' },
              { ime: 'Alleghanyite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,41' },
              { ime: 'Andychristyite<br>(-)', formula: 'PbCu<sup class="SupSet">2+</sup>Te<sup class="SupSet">6+</sup>O<sub class="SubSet4">5</sub>(H<sub class="SubSet4">2</sub>O)', postotak: '0,41' },
              { ime: 'Epididymite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Be<sub class="SubSet4">2</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">15</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,41' },
              { ime: 'Eudidymite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Be<sub class="SubSet4">2</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">15</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,41' },
              { ime: 'Ferricerite-(LaCa)<br>(-)', formula: '(La<sub class="SubSet4">6</sub>Ca<sub class="SubSet4">3</sub>)◻Fe<sup class="SupSet">3+</sup>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(SiO<sub class="SubSet4">3</sub>OH)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,41' },
              { ime: 'Kyzylkumite<br>(-)', formula: 'Ti<sub class="SubSet4">2</sub>V<sup class="SupSet">3+</sup>O<sub class="SubSet4">5</sub>(OH)', postotak: '0,41' },
              { ime: 'Nanpingite<br>(-)', formula: 'CsAl<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">3</sub>Al)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,41' },
              { ime: 'Ribbeite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,41' },
              { ime: 'Scorticoite<br>(-)', formula: 'Mn<sub class="SubSet4">6</sub>(Sb◻)(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,41' },
              { ime: 'Theoparacelsite<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">2</sub>As<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>', postotak: '0,41' },
              { ime: 'Uvite<br>(-)', formula: 'CaMg<sub class="SubSet4">3</sub>(Al<sub class="SubSet4">5</sub>Mg)(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>(OH)', postotak: '0,41' },
              { ime: 'Vaniniite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Mn<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,41' },
              { ime: 'Wilhelmkleinite<br>(-)', formula: 'ZnFe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,41' },
              { ime: 'Yangite<br>(-)', formula: 'PbMnSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">8</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,41' },
              { ime: 'Barentsite<br>(-)', formula: 'Na<sub class="SubSet4">7</sub>Al(HCO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>F<sub class="SubSet4">4</sub>', postotak: '0,40' },
              { ime: 'Bederite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,40' },
              { ime: 'Celleriite<br>(-)', formula: '◻(Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Al)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>(OH)', postotak: '0,40' },
              { ime: 'Cerite-(CeCa)<br>(-)', formula: '(Ce<sub class="SubSet4">7</sub>Ca<sub class="SubSet4">2</sub>)◻Mg(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(SiO<sub class="SubSet4">3</sub>OH)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,40' },
              { ime: 'Ces&agrave;rolite<br>(-)', formula: 'PbMn<sup class="SupSet">4+</sup><sub class="SubSet4">3</sub>O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,40' },
              { ime: 'Chrysothallite<br>(-)', formula: 'K<sub class="SubSet4">6</sub>Cu<sub class="SubSet4">6</sub>Tl<sup class="SupSet">3+</sup>Cl<sub class="SubSet4">17</sub>(OH)<sub class="SubSet4">4</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,40' },
              { ime: 'Cobaltaustinite<br>(-)', formula: 'CaCo(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,40' },
              { ime: 'Foitite<br>(-)', formula: '◻(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Al)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>(OH)', postotak: '0,40' },
              { ime: 'Johninnesite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">9</sub>Mg<sub class="SubSet4">7</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">17</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">8</sub>', postotak: '0,40' },
              { ime: 'Maneckiite<br>(-)', formula: '(Na◻)Ca<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>(Fe<sup class="SupSet">3+</sup>Mg)Mn<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,40' },
              { ime: 'Nickelaustinite<br>(-)', formula: 'CaNi(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,40' },
              { ime: 'Plumboperloffite<br>(-)', formula: 'PbMn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,40' },
              { ime: 'Romanorlovite<br>(-)', formula: 'K<sub class="SubSet4">11</sub>Cu<sub class="SubSet4">9</sub>Cl<sub class="SubSet4">25</sub>(OH)<sub class="SubSet4">4</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,40' },
              { ime: 'Shirozulite<br>(-)', formula: 'KMn<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>(Si<sub class="SubSet4">3</sub>Al)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,40' },
              { ime: 'Annite<br>(-)', formula: 'KFe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>(AlSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,39' },
              { ime: 'Austinite<br>(-)', formula: 'CaZn(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,39' },
              { ime: 'Conichalcite<br>(-)', formula: 'CaCu(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,39' },
              { ime: 'Engelhauptite<br>(-)', formula: 'KCu<sub class="SubSet4">3</sub>(V<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(OH)<sub class="SubSet4">2</sub>Cl', postotak: '0,39' },
              { ime: 'Evanichite<br>(-)', formula: 'Pb<sub class="SubSet4">6</sub>Cr<sup class="SupSet">3+</sup>(Cr<sup class="SupSet">6+</sup>O<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">7</sub>FCl', postotak: '0,39' },
              { ime: 'Hingganite-(Ce)<br>(-)', formula: 'BeCe(SiO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,39' },
              { ime: 'Kinoshitalite<br>(-)', formula: 'BaMg<sub class="SubSet4">3</sub>(Si<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>O<sub class="SubSet4">10</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,39' },
              { ime: 'Laurionite<br>(-)', formula: 'PbCl(OH)', postotak: '0,39' },
              { ime: 'Liraite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>[Fe<sup class="SupSet">3+</sup>Fe<sup class="SupSet">2+</sup>]Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,39' },
              { ime: 'Meifuite<br>(-)', formula: 'KFe<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">19</sub>(OH)<sub class="SubSet4">4</sub>Cl<sub class="SubSet4">2</sub>', postotak: '0,39' },
              { ime: 'Paralaurionite<br>(-)', formula: 'PbCl(OH)', postotak: '0,39' },
              { ime: 'Siidraite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Cu(OH)<sub class="SubSet4">2</sub>I<sub class="SubSet4">3</sub>', postotak: '0,39' },
              { ime: 'Siudaite<br>(-)', formula: 'Na<sub class="SubSet4">8</sub>(Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Na)Ca<sub class="SubSet4">6</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>Zr<sub class="SubSet4">3</sub>NbSi<sub class="SubSet4">25</sub>O<sub class="SubSet4">74</sub>(OH)<sub class="SubSet4">2</sub>Cl &#183; 5H<sub class="SubSet4">2</sub>O', postotak: '0,39' },
              { ime: 'Tarbagataite<br>(-)', formula: '(K◻)CaFe<sup class="SupSet">2+</sup><sub class="SubSet4">7</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">5</sub>', postotak: '0,39' },
              { ime: 'Vishnevite<br>(-)', formula: 'Na<sub class="SubSet4">8</sub>(Al<sub class="SubSet4">6</sub>Si<sub class="SubSet4">6</sub>)O<sub class="SubSet4">24</sub>(SO<sub class="SubSet4">4</sub>) &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,39' },
              { ime: 'Wopmayite<br>(-)', formula: 'Ca<sub class="SubSet4">6</sub>Na<sub class="SubSet4">3</sub>◻Mn(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(PO<sub class="SubSet4">3</sub>OH)<sub class="SubSet4">4</sub>', postotak: '0,39' },
              { ime: 'Adachiite<br>(-)', formula: 'CaFe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">5</sub>AlO<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>(OH)', postotak: '0,38' },
              { ime: 'Akdalaite<br>(-)', formula: 'Al<sub class="SubSet4">10</sub>O<sub class="SubSet4">14</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,38' },
              { ime: 'Camanchacaite<br>(-)', formula: 'Na◻CaMg<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>[AsO<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>]', postotak: '0,38' },
              { ime: 'Dellaite<br>(-)', formula: 'Ca<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,38' },
              { ime: 'Eveite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,38' },
              { ime: 'Feruvite<br>(-)', formula: 'CaFe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>(Al<sub class="SubSet4">5</sub>Mg)(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>(OH)', postotak: '0,38' },
              { ime: 'Hingganite-(Nd)<br>(-)', formula: 'Nd<sub class="SubSet4">2</sub>◻Be<sub class="SubSet4">2</sub>Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">8</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,38' },
              { ime: 'Ivsite<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>H(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>', postotak: '0,38' },
              { ime: 'Meisserite<br>(-)', formula: 'Na<sub class="SubSet4">5</sub>(UO<sub class="SubSet4">2</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(SO<sub class="SubSet4">3</sub>OH)(H<sub class="SubSet4">2</sub>O)', postotak: '0,38' },
              { ime: 'Pitiglianoite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>Na<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">6</sub>)O<sub class="SubSet4">24</sub>(SO<sub class="SubSet4">4</sub>) &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,38' },
              { ime: 'Sarkinite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,38' },
              { ime: 'Schorl<br>(-)', formula: 'NaFe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>(OH)', postotak: '0,38' },
              { ime: 'Tsilaisite<br>(-)', formula: 'NaMn<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>(OH)', postotak: '0,38' },
              { ime: 'Caledonite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>Pb<sub class="SubSet4">5</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(CO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">6</sub>', postotak: '0,37' },
              { ime: 'Chernykhite<br>(-)', formula: 'BaV<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,37' },
              { ime: 'Crimsonite<br>(-)', formula: 'PbFe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,37' },
              { ime: 'Fiedlerite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>Cl<sub class="SubSet4">4</sub>F(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,37' },
              { ime: 'Hendricksite<br>(-)', formula: 'KZn<sub class="SubSet4">3</sub>(Si<sub class="SubSet4">3</sub>Al)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,37' },
              { ime: 'Lindgrenite<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>(Mo<sup class="SupSet">6+</sup>O<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,37' },
              { ime: 'Magnesiocanutite<br>(-)', formula: 'Na◻MnMg<sub class="SubSet4">2</sub>[AsO<sub class="SubSet4">4</sub>]<sub class="SubSet4">2</sub>[AsO<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>]', postotak: '0,37' },
              { ime: 'Tetraferriannite<br>(-)', formula: 'KFe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>(Si<sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup>)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,37' },
              { ime: 'Cannonite<br>(-)', formula: 'Bi<sub class="SubSet4">2</sub>O(SO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,36' },
              { ime: 'Chromium-dravite<br>(-)', formula: 'NaMg<sub class="SubSet4">3</sub>Cr<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>(OH)', postotak: '0,36' },
              { ime: 'Finescreekite<br>(-)', formula: '[Pb<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub>](S<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>', postotak: '0,36' },
              { ime: 'Kristj&aacute;nite<br>(-)', formula: 'KNa<sub class="SubSet4">2</sub>H(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>', postotak: '0,36' },
              { ime: 'Kvanefjeldite<br>(-)', formula: 'Na<sub class="SubSet4">4</sub>CaSi<sub class="SubSet4">6</sub>O<sub class="SubSet4">14</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,36' },
              { ime: 'Lavinskyite<br>(-)', formula: 'K(LiCu)Cu<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">11</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,36' },
              { ime: 'Olivenite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,36' },
              { ime: 'Viskontite<br>(-)', formula: 'Pb<sub class="SubSet4">5</sub>Cu<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(SeO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">6</sub>', postotak: '0,36' },
              { ime: 'Adamite<br>(-)', formula: 'Zn<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,35' },
              { ime: 'Armenite<br>(-)', formula: 'BaCa<sub class="SubSet4">2</sub>(Al<sub class="SubSet4">6</sub>Si<sub class="SubSet4">9</sub>)O<sub class="SubSet4">30</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,35' },
              { ime: 'Bunnoite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">6</sub>AlSi<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,35' },
              { ime: 'Clinojimthompsonite<br>(-)', formula: 'Mg<sub class="SubSet4">5</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">16</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,35' },
              { ime: 'Galgenbergite-(Ce)<br>(-)', formula: 'CaCe<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,35' },
              { ime: 'Hingganite-(Yb)<br>(-)', formula: 'BeYb(SiO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,35' },
              { ime: 'Jimthompsonite<br>(-)', formula: 'Mg<sub class="SubSet4">5</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">16</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,35' },
              { ime: 'Krettnichite<br>(-)', formula: 'PbMn<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,35' },
              { ime: 'Mounanaite<br>(-)', formula: 'PbFe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,35' },
              { ime: 'Nitroplumbite<br>(-)', formula: '[Pb<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub>](NO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>', postotak: '0,35' },
              { ime: 'Nuragheite<br>(-)', formula: 'Th(MoO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,35' },
              { ime: 'Paradamite<br>(-)', formula: 'Zn<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,35' },
              { ime: 'Paratimroseite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Cu<sub class="SubSet4">4</sub>(TeO<sub class="SubSet4">6</sub>)<sub class="SubSet4">2</sub>(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>', postotak: '0,35' },
              { ime: 'Rodalquilarite<br>(-)', formula: 'H<sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(Te<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>Cl', postotak: '0,35' },
              { ime: 'Zincolivenite<br>(-)', formula: 'CuZn(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,35' },
              { ime: 'Chegemite<br>(-)', formula: 'Ca<sub class="SubSet4">7</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,34' },
              { ime: 'Kasolite<br>(-)', formula: 'Pb(UO<sub class="SubSet4">2</sub>)(SiO<sub class="SubSet4">4</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,34' },
              { ime: 'Lobanovite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>Na(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Mg<sub class="SubSet4">2</sub>Na)Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,34' },
              { ime: 'Medenbachite<br>(-)', formula: 'Bi<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>Cu<sup class="SupSet">2+</sup>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O(OH)<sub class="SubSet4">3</sub>', postotak: '0,34' },
              { ime: 'Molybdophyllite<br>(-)', formula: 'Pb<sub class="SubSet4">8</sub>Mg<sub class="SubSet4">9</sub>[Si<sub class="SubSet4">10</sub>O<sub class="SubSet4">28</sub>(OH)<sub class="SubSet4">8</sub>O<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>] &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,34' },
              { ime: 'Strontio-orthojoaquinite<br>(-)', formula: 'NaSr<sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>Ti<sub class="SubSet4">2</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">24</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,34' },
              { ime: 'V&eacute;signi&eacute;ite<br>(-)', formula: 'Cu<sub class="SubSet4">3</sub>Ba(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,34' },
              { ime: 'Yazganite<br>(-)', formula: '◻NaMgFe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,34' },
              { ime: 'Bairdite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Cu<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Te<sup class="SupSet">6+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,33' },
              { ime: 'Beryllocordierite-Na<br>(-)', formula: 'NaMg<sub class="SubSet4">4</sub>(Al<sub class="SubSet4">5</sub>Be)(AlSi<sub class="SubSet4">5</sub>O<sub class="SubSet4">18</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,33' },
              { ime: 'Canutite<br>(-)', formula: 'Na◻MnMn<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)[AsO<sub class="SubSet4">3</sub>(OH)]<sub class="SubSet4">2</sub>', postotak: '0,33' },
              { ime: 'Ferrokinoshitalite<br>(-)', formula: 'BaFe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>(Si<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,33' },
              { ime: 'Grimselite<br>(-)', formula: 'K<sub class="SubSet4">3</sub>Na(UO<sub class="SubSet4">2</sub>)(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,33' },
              { ime: 'Heidornite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Ca<sub class="SubSet4">3</sub>B<sub class="SubSet4">5</sub>O<sub class="SubSet4">8</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>Cl', postotak: '0,33' },
              { ime: 'Hydroplumboelsmoreite<br>(-)', formula: '(Pb◻)(W<sub class="SubSet4">1.33</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">0.67</sub>)O<sub class="SubSet4">6</sub>(H<sub class="SubSet4">2</sub>O)', postotak: '0,33' },
              { ime: 'Philolithite<br>(-)', formula: 'Pb<sub class="SubSet4">12</sub>O<sub class="SubSet4">6</sub>Mn<sub class="SubSet4">7</sub>(SO<sub class="SubSet4">4</sub>)(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>Cl<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">12</sub>', postotak: '0,33' },
              { ime: 'Spriggite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">6</sub>O<sub class="SubSet4">8</sub>(OH)<sub class="SubSet4">2</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,33' },
              { ime: 'Stoppaniite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Be<sub class="SubSet4">3</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,33' },
              { ime: 'Uranotungstite<br>(-)', formula: 'Ba(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>W<sub class="SubSet4">2</sub>O<sub class="SubSet4">8</sub>(OH)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,33' },
              { ime: 'Ussingite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>AlSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">8</sub>(OH)', postotak: '0,33' },
              { ime: 'Alumino-oxy-rossmanite<br>(-)', formula: 'Al<sub class="SubSet4">3</sub>Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">5</sub>AlO<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,32' },
              { ime: 'Alumovesuvianite<br>(-)', formula: 'Ca<sub class="SubSet4">19</sub>Al(Al<sub class="SubSet4">10</sub>Mg<sub class="SubSet4">2</sub>)Si<sub class="SubSet4">18</sub>O<sub class="SubSet4">69</sub>(OH)<sub class="SubSet4">9</sub>', postotak: '0,32' },
              { ime: 'Bearthite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,32' },
              { ime: 'Canasite<br>(-)', formula: 'K<sub class="SubSet4">3</sub>Na<sub class="SubSet4">3</sub>Ca<sub class="SubSet4">5</sub>Si<sub class="SubSet4">12</sub>O<sub class="SubSet4">30</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,32' },
              { ime: 'Carminite<br>(-)', formula: 'PbFe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,32' },
              { ime: 'Cascandite<br>(-)', formula: 'CaScSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">8</sub>(OH)', postotak: '0,32' },
              { ime: 'Darrellhenryite<br>(-)', formula: 'Na(Al<sub class="SubSet4">2</sub>Li)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,32' },
              { ime: 'Davreuxite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup>Al<sub class="SubSet4">6</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">17</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,32' },
              { ime: 'Fluor-elbaite<br>(-)', formula: 'Na(Li<sub class="SubSet4">1.5</sub>Al<sub class="SubSet4">1.5</sub>)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>F', postotak: '0,32' },
              { ime: 'Fluor-liddicoatite<br>(-)', formula: 'Ca(Li<sub class="SubSet4">2</sub>Al)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>F', postotak: '0,32' },
              { ime: 'Hydroxylclinohumite<br>(-)', formula: 'Mg<sub class="SubSet4">9</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,32' },
              { ime: 'Magnesiovesuvianite<br>(-)', formula: 'Ca<sub class="SubSet4">19</sub>Mg(Al<sub class="SubSet4">11</sub>Mg)Si<sub class="SubSet4">18</sub>O<sub class="SubSet4">69</sub>(OH)<sub class="SubSet4">9</sub>', postotak: '0,32' },
              { ime: 'Mawbyite<br>(-)', formula: 'PbFe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,32' },
              { ime: 'Murakamiite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>LiSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">8</sub>(OH)', postotak: '0,32' },
              { ime: 'O&#39;danielite<br>(-)', formula: 'Na◻ZnZn<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)[AsO<sub class="SubSet4">3</sub>(OH)]<sub class="SubSet4">2</sub>', postotak: '0,32' },
              { ime: 'Paulkellerite<br>(-)', formula: 'Bi<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>O<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,32' },
              { ime: 'Pseudosinhalite<br>(-)', formula: 'Mg<sub class="SubSet4">2</sub>Al<sub class="SubSet4">3</sub>B<sub class="SubSet4">2</sub>O<sub class="SubSet4">9</sub>(OH)', postotak: '0,32' },
              { ime: 'Quenselite<br>(-)', formula: 'PbMn<sup class="SupSet">3+</sup>O<sub class="SubSet4">2</sub>(OH)', postotak: '0,32' },
              { ime: 'Astrophyllite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>NaFe<sup class="SupSet">2+</sup><sub class="SubSet4">7</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>F', postotak: '0,31' },
              { ime: 'Chesterite<br>(-)', formula: 'Mg<sub class="SubSet4">17</sub>Si<sub class="SubSet4">20</sub>O<sub class="SubSet4">54</sub>(OH)<sub class="SubSet4">6</sub>', postotak: '0,31' },
              { ime: 'Dixenite<br>(-)', formula: 'Cu<sup class="SupSet">1+</sup>Fe<sup class="SupSet">3+</sup>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">14</sub>(As<sup class="SupSet">5+</sup>O<sub class="SubSet4">4</sub>)(As<sup class="SupSet">3+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">5</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">6</sub>', postotak: '0,31' },
              { ime: 'Fluor-dravite<br>(-)', formula: 'NaMg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>F', postotak: '0,31' },
              { ime: 'Fluor-uvite<br>(-)', formula: 'CaMg<sub class="SubSet4">3</sub>(Al<sub class="SubSet4">5</sub>Mg)(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>F', postotak: '0,31' },
              { ime: 'Grischunite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>Fe<sup class="SupSet">3+</sup>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,31' },
              { ime: 'Hor&aacute;kite<br>(-)', formula: '(Bi<sub class="SubSet4">7</sub>O<sub class="SubSet4">7</sub>OH)[(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">4</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>] &#183; 3.5H<sub class="SubSet4">2</sub>O', postotak: '0,31' },
              { ime: 'Kainosite-(Y)<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Y<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>(CO<sub class="SubSet4">3</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,31' },
              { ime: 'Khinite<br>(-)', formula: 'Cu<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>PbTe<sup class="SupSet">6+</sup>O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,31' },
              { ime: 'Kupletskite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>NaMn<sup class="SupSet">2+</sup><sub class="SubSet4">7</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>F', postotak: '0,31' },
              { ime: 'Magnesio-dutrowite<br>(-)', formula: 'Na(Mg<sub class="SubSet4">2.5</sub>Ti<sub class="SubSet4">0.5</sub>)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,31' },
              { ime: 'Magnesio-lucchesiite<br>(-)', formula: 'CaMg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,31' },
              { ime: 'Manganvesuvianite<br>(-)', formula: 'Ca<sub class="SubSet4">19</sub>Mn<sup class="SupSet">3+</sup>Al<sub class="SubSet4">10</sub>Mg<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">10</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">4</sub>O(OH)<sub class="SubSet4">9</sub>', postotak: '0,31' },
              { ime: 'Maruyamaite<br>(-)', formula: 'K(MgAl<sub class="SubSet4">2</sub>)(Al<sub class="SubSet4">5</sub>Mg)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(OH)<sub class="SubSet4">3</sub>O', postotak: '0,31' },
              { ime: 'Montanite<br>(-)', formula: 'Bi<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Te<sup class="SupSet">6+</sup>O<sub class="SubSet4">6</sub> &#183; <em>n</em>H<sub class="SubSet4">2</sub>O (0 &le;&nbsp;<em>n</em>&nbsp;&le; 2/3)', postotak: '0,31' },
              { ime: 'Nealite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>Fe(AsO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>Cl<sub class="SubSet4">4</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,31' },
              { ime: 'Oxy-dravite<br>(-)', formula: 'Na(Al<sub class="SubSet4">2</sub>Mg)(Al<sub class="SubSet4">5</sub>Mg)(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,31' },
              { ime: 'Oxy-foitite<br>(-)', formula: '◻(Fe<sup class="SupSet">2+</sup>Al<sub class="SubSet4">2</sub>)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,31' },
              { ime: 'Rudolfhermannite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(Te<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,31' },
              { ime: 'Shattuckite<br>(-)', formula: 'Cu<sub class="SubSet4">5</sub>(SiO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,31' },
              { ime: 'Wildcatite<br>(-)', formula: 'CaFe<sup class="SupSet">3+</sup>Te<sup class="SupSet">6+</sup>O<sub class="SubSet4">5</sub>(OH)', postotak: '0,31' },
              { ime: 'Xocolatlite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">4+</sup><sub class="SubSet4">2</sub>Te<sup class="SupSet">6+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">12</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,31' },
              { ime: 'Yoderite<br>(-)', formula: '(MgAl<sub class="SubSet4">3</sub>)(MgAl)Al<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,31' },
              { ime: 'Beryllosachanbińskiite-Na<br>(-)', formula: 'NaMn<sub class="SubSet4">4</sub>(Al<sub class="SubSet4">5</sub>Be)(AlSi<sub class="SubSet4">5</sub>O<sub class="SubSet4">18</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,30' },
              { ime: 'Khorixasite<br>(-)', formula: '(Bi<sub class="SubSet4">0.67</sub>◻<sub class="SubSet4">0.33</sub>)Cu(VO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,30' },
              { ime: 'Klebelsbergite<br>(-)', formula: 'Sb<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>O<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,30' },
              { ime: 'Lucasite-(Ce)<br>(-)', formula: 'CeTi<sub class="SubSet4">2</sub>O<sub class="SubSet4">5</sub>(OH)', postotak: '0,30' },
              { ime: 'Oxy-schorl<br>(-)', formula: 'Na(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Al)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,30' },
              { ime: 'Pectolite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">8</sub>(OH)', postotak: '0,30' },
              { ime: 'Princivalleite<br>(-)', formula: 'Na(Mn<sub class="SubSet4">2</sub>Al)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,30' },
              { ime: 'Scheuchzerite<br>(-)', formula: 'NaMn<sup class="SupSet">2+</sup><sub class="SubSet4">9</sub>Si<sub class="SubSet4">9</sub>V<sup class="SupSet">5+</sup>O<sub class="SubSet4">28</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,30' },
              { ime: 'Shakhovite<br>(-)', formula: 'Hg<sup class="SupSet">1+</sup><sub class="SubSet4">4</sub>Sb<sup class="SupSet">5+</sup>O<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>', postotak: '0,30' },
              { ime: 'Zemannite<br>(-)', formula: 'Mg<sub class="SubSet4">0.5</sub>ZnFe<sup class="SupSet">3+</sup>(Te<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub> &#183; <em>n</em>H<sub class="SubSet4">2</sub>O (3&le;<em>n</em>&le;4.5)', postotak: '0,30' },
              { ime: 'Barrydawsonite-(Y)<br>(-)', formula: 'Na<sub class="SubSet4">1.5</sub>Y<sub class="SubSet4">0.5</sub>CaSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub>H', postotak: '0,29' },
              { ime: 'Bosiite<br>(-)', formula: 'NaFe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(Al<sub class="SubSet4">4</sub>Mg<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,29' },
              { ime: 'Chromo-alumino-povondraite<br>(-)', formula: 'NaCr<sub class="SubSet4">3</sub>(Al<sub class="SubSet4">4</sub>Mg<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,29' },
              { ime: 'Dutrowite<br>(-)', formula: 'Na(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2.5</sub>Ti<sub class="SubSet4">0.5</sub>)Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,29' },
              { ime: 'Erikapohlite<br>(-)', formula: '(◻<sub class="SubSet4">0.5</sub>Cu<sub class="SubSet4">0.5</sub>)CuCaZn<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,29' },
              { ime: 'Fluor-schorl<br>(-)', formula: 'NaFe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>F', postotak: '0,29' },
              { ime: 'Fluor-tsilaisite<br>(-)', formula: 'NaMn<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>F', postotak: '0,29' },
              { ime: 'Kapustinite<br>(-)', formula: 'Na<sub class="SubSet4">6</sub>ZrSi<sub class="SubSet4">6</sub>O<sub class="SubSet4">16</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,29' },
              { ime: 'Karpovite<br>(-)', formula: 'Tl<sub class="SubSet4">2</sub>VO(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(H<sub class="SubSet4">2</sub>O)', postotak: '0,29' },
              { ime: 'Kuliokite-(Y)<br>(-)', formula: 'Y<sub class="SubSet4">4</sub>Al(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>F<sub class="SubSet4">5</sub>', postotak: '0,29' },
              { ime: 'Langhofite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>(OH)[WO<sub class="SubSet4">4</sub>(OH)]', postotak: '0,29' },
              { ime: 'Laverovite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>NaMn<sub class="SubSet4">7</sub>Zr<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>F', postotak: '0,29' },
              { ime: 'Leucophoenicite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">7</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,29' },
              { ime: 'Manganhumite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">7</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,29' },
              { ime: 'Phosphowalpurgite<br>(-)', formula: '(UO<sub class="SubSet4">2</sub>)Bi<sub class="SubSet4">4</sub>O<sub class="SubSet4">4</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,29' },
              { ime: 'Plumbophyllite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,29' },
              { ime: 'Rickturnerite<br>(-)', formula: 'Pb<sub class="SubSet4">7</sub>O<sub class="SubSet4">4</sub>[Mg(OH)<sub class="SubSet4">4</sub>](OH)Cl<sub class="SubSet4">3</sub>', postotak: '0,29' },
              { ime: 'Schizolite<br>(-)', formula: 'NaCaMnSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">8</sub>(OH)', postotak: '0,29' },
              { ime: 'Schultenite<br>(-)', formula: 'Pb(AsO<sub class="SubSet4">3</sub>OH)', postotak: '0,29' },
              { ime: 'Tanohataite<br>(-)', formula: 'LiMn<sub class="SubSet4">2</sub>Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">8</sub>(OH)', postotak: '0,29' },
              { ime: 'Vanadio-oxy-dravite<br>(-)', formula: 'NaV<sub class="SubSet4">3</sub>(Al<sub class="SubSet4">4</sub>Mg<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,29' },
              { ime: 'Vyacheslavite<br>(-)', formula: 'U<sup class="SupSet">4+</sup>(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,29' },
              { ime: 'Zircophyllite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>NaFe<sup class="SupSet">2+</sup><sub class="SubSet4">7</sub>Zr<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>F', postotak: '0,29' },
              { ime: 'Cubothioplumbite<br>(-)', formula: '[Pb<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub>]Pb(S<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>', postotak: '0,28' },
              { ime: 'Cuprotungstite<br>(-)', formula: 'Cu<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>(WO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,28' },
              { ime: 'Garpenbergite<br>(-)', formula: 'Mn<sub class="SubSet4">6</sub>AsSbO<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,28' },
              { ime: 'Hexathioplumbite<br>(-)', formula: '[Pb<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub>]Pb(S<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>', postotak: '0,28' },
              { ime: 'Kegelite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>Al<sub class="SubSet4">2</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">10</sub>(SO<sub class="SubSet4">4</sub>)(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,28' },
              { ime: 'Lamprophyllite<br>(-)', formula: '(SrNa)Ti<sub class="SubSet4">2</sub>Na<sub class="SubSet4">3</sub>Ti(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,28' },
              { ime: 'Lucchesiite<br>(-)', formula: 'CaFe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,28' },
              { ime: 'M&eacute;lonjosephite<br>(-)', formula: 'CaFe<sup class="SupSet">2+</sup>Fe<sup class="SupSet">3+</sup>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,28' },
              { ime: 'Seaborgite<br>(-)', formula: 'LiK<sub class="SubSet4">2</sub>Na<sub class="SubSet4">6</sub>(UO<sub class="SubSet4">2</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">5</sub>(SO<sub class="SubSet4">3</sub>OH)(H<sub class="SubSet4">2</sub>O)', postotak: '0,28' },
              { ime: 'Serandite<br>(-)', formula: 'NaMn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">8</sub>(OH)', postotak: '0,28' },
              { ime: 'Xonotlite<br>(-)', formula: 'Ca<sub class="SubSet4">6</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">17</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,28' },
              { ime: 'Bahianite<br>(-)', formula: 'Al<sub class="SubSet4">5</sub>Sb<sup class="SupSet">5+</sup><sub class="SubSet4">3</sub>O<sub class="SubSet4">14</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,27' },
              { ime: 'Britvinite<br>(-)', formula: 'Pb<sub class="SubSet4">14</sub>Mg<sub class="SubSet4">9</sub>(Si<sub class="SubSet4">10</sub>O<sub class="SubSet4">28</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">12</sub>F<sub class="SubSet4">2</sub>', postotak: '0,27' },
              { ime: 'Fengchengite<br>(-)', formula: 'Na<sub class="SubSet4">12</sub>◻<sub class="SubSet4">3</sub>Ca<sub class="SubSet4">6</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>Zr<sub class="SubSet4">3</sub>Si(Si<sub class="SubSet4">25</sub>O<sub class="SubSet4">73</sub>)(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,27' },
              { ime: 'Ferro-bosiite<br>(-)', formula: 'NaFe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(Al<sub class="SubSet4">4</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,27' },
              { ime: 'Holmquistite<br>(-)', formula: '◻Li<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,27' },
              { ime: 'Kupletskite-(Cs)<br>(-)', formula: 'Cs<sub class="SubSet4">2</sub>NaMn<sup class="SupSet">2+</sup><sub class="SubSet4">7</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>F', postotak: '0,27' },
              { ime: 'Odikhinchaite<br>(-)', formula: 'Na<sub class="SubSet4">9</sub>Sr<sub class="SubSet4">3</sub>[(H<sub class="SubSet4">2</sub>O)<sub class="SubSet4">2</sub>Na]Ca<sub class="SubSet4">6</sub>Mn<sub class="SubSet4">3</sub>Zr<sub class="SubSet4">3</sub>NbSi(Si<sub class="SubSet4">24</sub>O<sub class="SubSet4">72</sub>)O(OH)<sub class="SubSet4">3</sub>(CO<sub class="SubSet4">3</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,27' },
              { ime: 'Orthowalpurgite<br>(-)', formula: '(UO<sub class="SubSet4">2</sub>)Bi<sub class="SubSet4">4</sub>O<sub class="SubSet4">4</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,27' },
              { ime: 'Oxy-chromium-dravite<br>(-)', formula: 'NaCr<sub class="SubSet4">3</sub>(Cr<sub class="SubSet4">4</sub>Mg<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,27' },
              { ime: 'Oxy-vanadium-dravite<br>(-)', formula: 'NaV<sub class="SubSet4">3</sub>(V<sub class="SubSet4">4</sub>Mg<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,27' },
              { ime: 'Samfowlerite<br>(-)', formula: 'Ca<sub class="SubSet4">14</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Zn<sub class="SubSet4">2</sub>Be<sub class="SubSet4">2</sub>Be<sub class="SubSet4">6</sub>Si<sub class="SubSet4">14</sub>O<sub class="SubSet4">52</sub>(OH)<sub class="SubSet4">6</sub>', postotak: '0,27' },
              { ime: 'Vanadio-oxy-chromium-dravite<br>(-)', formula: 'NaV<sub class="SubSet4">3</sub>(Cr<sub class="SubSet4">4</sub>Mg<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,27' },
              { ime: 'Walpurgite<br>(-)', formula: 'Bi<sub class="SubSet4">4</sub>O<sub class="SubSet4">4</sub>(UO<sub class="SubSet4">2</sub>)(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,27' },
              { ime: 'Anthophyllite<br>(-)', formula: '◻Mg<sub class="SubSet4">2</sub>Mg<sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,26' },
              { ime: 'Čechite<br>(-)', formula: 'PbFe<sup class="SupSet">2+</sup>(VO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,26' },
              { ime: 'Chadwickite<br>(-)', formula: '(UO<sub class="SubSet4">2</sub>)(HAsO<sub class="SubSet4">3</sub>)', postotak: '0,26' },
              { ime: 'Cummingtonite<br>(-)', formula: '◻Mg<sub class="SubSet4">2</sub>Mg<sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,26' },
              { ime: 'Diegogattaite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>CaCu<sub class="SubSet4">2</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">20</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,26' },
              { ime: 'Feinglosite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Zn(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,26' },
              { ime: 'Gedrite<br>(-)', formula: '◻Mg<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,26' },
              { ime: 'Glaucophane<br>(-)', formula: '◻Na<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,26' },
              { ime: 'Huenite<br>(-)', formula: 'Cu<sub class="SubSet4">4</sub>(MoO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,26' },
              { ime: 'Hydrocerussite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,26' },
              { ime: 'Hydroxyledgrewite<br>(-)', formula: 'Ca<sub class="SubSet4">9</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,26' },
              { ime: 'Keyite<br>(-)', formula: '(◻<sub class="SubSet4">0.5</sub>Cu<sub class="SubSet4">0.5</sub>)CuCdZn<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,26' },
              { ime: 'Nabalamprophyllite<br>(-)', formula: '(BaNa)Ti<sub class="SubSet4">2</sub>Na<sub class="SubSet4">3</sub>Ti(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,26' },
              { ime: 'Nolanite<br>(-)', formula: 'V<sup class="SupSet">3+</sup><sub class="SubSet4">8</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">14</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,26' },
              { ime: 'Povondraite<br>(-)', formula: 'NaFe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(Fe<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>Mg<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>(OH)<sub class="SubSet4">3</sub>O', postotak: '0,26' },
              { ime: 'Proto-anthophyllite<br>(-)', formula: '◻Mg<sub class="SubSet4">2</sub>Mg<sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,26' },
              { ime: 'Pyrobelonite<br>(-)', formula: 'PbMn<sup class="SupSet">2+</sup>VO<sub class="SubSet4">4</sub>(OH)', postotak: '0,26' },
              { ime: 'Redmondite<br>(-)', formula: '[Pb<sub class="SubSet4">8</sub>O<sub class="SubSet4">2</sub>Zn(OH)<sub class="SubSet4">6</sub>](S<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>', postotak: '0,26' },
              { ime: 'Steenstrupine-(Ce)<br>(-)', formula: 'Na<sub class="SubSet4">14</sub>Ce<sub class="SubSet4">6</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Zr(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">7</sub>Si<sub class="SubSet4">12</sub>O<sub class="SubSet4">36</sub>(OH)<sub class="SubSet4">2</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,26' },
              { ime: 'Vistepite<br>(-)', formula: 'Mn<sub class="SubSet4">4</sub>SnB<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,26' },
              { ime: 'Amamoorite<br>(-)', formula: 'CaMn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Mn<sup class="SupSet">3+</sup>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)O(OH)', postotak: '0,25' },
              { ime: 'Barroisite<br>(-)', formula: '◻(NaCa)(Mg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Barytolamprophyllite<br>(-)', formula: '(BaK)Ti<sub class="SubSet4">2</sub>Na<sub class="SubSet4">3</sub>Ti(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Braccoite<br>(-)', formula: 'NaMn<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>[Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">14</sub>(OH)](AsO<sub class="SubSet4">3</sub>)(OH)', postotak: '0,25' },
              { ime: 'Chloroxiphite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>CuO<sub class="SubSet4">2</sub>Cl<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Clino-ferri-holmquistite<br>(-)', formula: '◻Li<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Descloizite<br>(-)', formula: 'PbZn(VO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,25' },
              { ime: 'Eckermannite<br>(-)', formula: 'NaNa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>Al)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Eyselite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup>Ge<sup class="SupSet">4+</sup><sub class="SubSet4">3</sub>O<sub class="SubSet4">7</sub>(OH)', postotak: '0,25' },
              { ime: 'Ferrihydrite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">10</sub>O<sub class="SubSet4">14</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Ferri-pedrizite<br>(-)', formula: 'NaLi<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Li)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Ferro-pedrizite<br>(-)', formula: 'NaLi<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>Li)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Goedkenite<br>(-)', formula: 'Sr<sub class="SubSet4">2</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,25' },
              { ime: 'Ilvaite<br>(-)', formula: 'CaFe<sup class="SupSet">3+</sup>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>O(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(OH)', postotak: '0,25' },
              { ime: 'Katophorite<br>(-)', formula: 'Na(NaCa)(Mg<sub class="SubSet4">4</sub>Al)(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Mackayite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup>Te<sup class="SupSet">4+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">5</sub>(OH)', postotak: '0,25' },
              { ime: 'Magnesio-hornblende<br>(-)', formula: '◻Ca<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>Al)(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Manganilvaite<br>(-)', formula: 'CaFe<sup class="SupSet">2+</sup>Fe<sup class="SupSet">3+</sup>Mn<sup class="SupSet">2+</sup>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)O(OH)', postotak: '0,25' },
              { ime: 'Meierite<br>(-)', formula: 'Ba<sub class="SubSet4">44</sub>Si<sub class="SubSet4">66</sub>Al<sub class="SubSet4">30</sub>O<sub class="SubSet4">192</sub>Cl<sub class="SubSet4">25</sub>(OH)<sub class="SubSet4">33</sub>', postotak: '0,25' },
              { ime: 'Mottramite<br>(-)', formula: 'PbCu(VO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,25' },
              { ime: 'Nyb&oslash;ite<br>(-)', formula: 'NaNa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Pilawite-(Y)<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Y<sub class="SubSet4">2</sub>Al<sub class="SubSet4">4</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Richterite<br>(-)', formula: 'Na(NaCa)Mg<sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Saneroite<br>(-)', formula: 'NaMn<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>[Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">14</sub>(OH)](VO<sub class="SubSet4">3</sub>)(OH)', postotak: '0,25' },
              { ime: 'Scandio-winchite<br>(-)', formula: '◻(NaCa)(Mg<sub class="SubSet4">4</sub>Sc)(Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Taramite<br>(-)', formula: 'Na(NaCa)(Mg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Tschermakite<br>(-)', formula: '◻Ca<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Welinite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">6</sub>(W<sup class="SupSet">6+</sup>◻)(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Winchite<br>(-)', formula: '◻(NaCa)(Mg<sub class="SubSet4">4</sub>Al)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,25' },
              { ime: 'Aluminotaipingite-(CeCa)<br>(-)', formula: '(Ce<sub class="SubSet4">6</sub>Ca<sub class="SubSet4">3</sub>)Al(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>[SiO<sub class="SubSet4">3</sub>(OH)]<sub class="SubSet4">4</sub>F<sub class="SubSet4">3</sub>', postotak: '0,24' },
              { ime: 'Aravaipaite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>AlF<sub class="SubSet4">9</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,24' },
              { ime: 'Arsendescloizite<br>(-)', formula: 'PbZn(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,24' },
              { ime: 'Clino-suenoite<br>(-)', formula: '◻Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Mg<sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Duftite<br>(-)', formula: 'PbCu(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,24' },
              { ime: 'Edenite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>Mg<sub class="SubSet4">5</sub>(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Ferri-ghoseite<br>(-)', formula: '◻(NaMn<sup class="SupSet">2+</sup>)(Mg<sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Ferri-katophorite<br>(-)', formula: 'Na(NaCa)(Mg<sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Ferri-leakeite<br>(-)', formula: 'NaNa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Li)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Ferri-winchite<br>(-)', formula: '◻(NaCa)(Mg<sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Ferro-holmquistite<br>(-)', formula: '◻Li<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Hanjiangite<br>(-)', formula: 'Ba<sub class="SubSet4">2</sub>Ca(V<sup class="SupSet">3+</sup>Al)(AlSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">10</sub>)(OH)<sub class="SubSet4">2</sub>F(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Hjalmarite<br>(-)', formula: 'Na(NaMn)Mg<sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Magnesio-arfvedsonite<br>(-)', formula: 'NaNa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Magnesio-ferri-hornblende<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)[(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>](OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Magnesio-riebeckite<br>(-)', formula: '◻Na<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Mangani-eckermannite<br>(-)', formula: 'NaNa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>Mn<sup class="SupSet">3+</sup>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Pargasite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>Al)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Potassic-magnesio-arfvedsonite<br>(-)', formula: 'KNa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Potassic-pargasite<br>(-)', formula: 'KCa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>Al)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Potassic-richterite<br>(-)', formula: 'K(NaCa)Mg<sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Potassic-sadanagaite<br>(-)', formula: 'KCa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">5</sub>Al<sub class="SubSet4">3</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Sadanagaite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">5</sub>Al<sub class="SubSet4">3</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Suenoite<br>(-)', formula: '◻Mn<sub class="SubSet4">2</sub>Mg<sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,24' },
              { ime: 'Widenmannite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>[(UO<sub class="SubSet4">2</sub>)(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>]', postotak: '0,24' },
              { ime: 'Armellinoite-(Ce)<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Ce<sup class="SupSet">4+</sup>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,23' },
              { ime: 'Chapmanite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Sb<sup class="SupSet">3+</sup>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">5</sub>)O<sub class="SubSet4">3</sub>(OH)', postotak: '0,23' },
              { ime: 'Chromio-pargasite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>Cr)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Ferri-taramite<br>(-)', formula: 'Na(NaCa)(Mg<sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Ferro-ferri-pedrizite<br>(-)', formula: 'NaLi<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Li)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Ferro-glaucophane<br>(-)', formula: '◻Na<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Flaggite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>Cu<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Te<sup class="SupSet">6+</sup><sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">11</sub>(OH)<sub class="SubSet4">2</sub>(H<sub class="SubSet4">2</sub>O)', postotak: '0,23' },
              { ime: 'Frankamenite<br>(-)', formula: 'K<sub class="SubSet4">3</sub>Na<sub class="SubSet4">3</sub>Ca<sub class="SubSet4">5</sub>Si<sub class="SubSet4">12</sub>O<sub class="SubSet4">30</sub>F<sub class="SubSet4">3</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,23' },
              { ime: 'G&ouml;rgeyite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>Ca<sub class="SubSet4">5</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,23' },
              { ime: 'Harstigite<br>(-)', formula: 'Ca<sub class="SubSet4">6</sub>Be<sub class="SubSet4">4</sub>Mn<sup class="SupSet">2+</sup>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Hydroxyferrorom&eacute;ite<br>(-)', formula: '(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">1.5</sub>◻<sub class="SubSet4">0.5</sub>)Sb<sup class="SupSet">5+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(OH)', postotak: '0,23' },
              { ime: 'Jonesite<br>(-)', formula: 'KBa<sub class="SubSet4">2</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">5</sub>Al)O<sub class="SubSet4">18</sub> &#183; nH<sub class="SubSet4">2</sub>O', postotak: '0,23' },
              { ime: 'Magnesio-hastingsite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Mangani-pargasite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>Mn<sup class="SupSet">3+</sup>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Orthobrannerite<br>(-)', formula: 'U<sup class="SupSet">4+</sup>U<sup class="SupSet">6+</sup>Ti<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Papikeite<br>(-)', formula: 'NaFe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">5</sub>Al<sub class="SubSet4">3</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Potassic-ferri-leakeite<br>(-)', formula: 'KNa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Li)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Potassic-magnesio-hastingsite<br>(-)', formula: 'KCa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Potassic-mangani-leakeite<br>(-)', formula: 'KNa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">2</sub>Mn<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Li)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Taipingite-(CeCa)<br>(-)', formula: '(Ce<sub class="SubSet4">7</sub>Ca<sub class="SubSet4">2</sub>)◻Mg(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>[SiO<sub class="SubSet4">3</sub>(OH)]<sub class="SubSet4">4</sub>F<sub class="SubSet4">3</sub>', postotak: '0,23' },
              { ime: 'Vanadio-pargasite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">4</sub>V)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,23' },
              { ime: 'Cesanite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Na<sub class="SubSet4">3</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>OH', postotak: '0,22' },
              { ime: 'Clino-ferro-ferri-holmquistite<br>(-)', formula: '◻Li<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,22' },
              { ime: 'Clinozoisite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Al<sub class="SubSet4">3</sub>[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,22' },
              { ime: 'Favreauite<br>(-)', formula: 'PbBiCu<sub class="SubSet4">6</sub>O<sub class="SubSet4">4</sub>(SeO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,22' },
              { ime: 'Ferro-ferri-holmquistite<br>(-)', formula: '◻Li<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,22' },
              { ime: 'Ferro-taramite<br>(-)', formula: 'Na(NaCa)(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,22' },
              { ime: 'Ferro-tschermakite<br>(-)', formula: '◻Ca<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,22' },
              { ime: 'Jerrygibbsite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">9</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,22' },
              { ime: 'Jinshajiangite<br>(-)', formula: 'BaNaFe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>F', postotak: '0,22' },
              { ime: 'Joaquinite-(Ce)<br>(-)', formula: 'NaBa<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup>Ti<sub class="SubSet4">2</sub>Ce<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,22' },
              { ime: 'Orlandiite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>Cl<sub class="SubSet4">4</sub>(Se<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,22' },
              { ime: 'Perraultite<br>(-)', formula: 'BaNaMn<sub class="SubSet4">4</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>F', postotak: '0,22' },
              { ime: 'Potassic-ferro-taramite<br>(-)', formula: 'K(NaCa)(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,22' },
              { ime: 'Prosperite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Zn<sub class="SubSet4">4</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,22' },
              { ime: 'Riebeckite<br>(-)', formula: '◻Na<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,22' },
              { ime: 'Rinmanite<br>(-)', formula: 'Mg<sub class="SubSet4">2</sub>Fe<sub class="SubSet4">4</sub>Zn<sub class="SubSet4">2</sub>Sb<sub class="SubSet4">2</sub>O<sub class="SubSet4">14</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,22' },
              { ime: 'Rustumite<br>(-)', formula: 'Ca<sub class="SubSet4">10</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>Cl<sub class="SubSet4">2</sub>', postotak: '0,22' },
              { ime: 'Sonolite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">9</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,22' },
              { ime: 'Zoisite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Al<sub class="SubSet4">3</sub>[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,22' },
              { ime: 'Arfvedsonite<br>(-)', formula: 'NaNa<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'C&aacute;maraite<br>(-)', formula: 'Ba<sub class="SubSet4">3</sub>NaFe<sup class="SupSet">2+</sup><sub class="SubSet4">8</sub>Ti<sub class="SubSet4">4</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">4</sub>O<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">4</sub>F<sub class="SubSet4">3</sub>', postotak: '0,21' },
              { ime: 'Epidote<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>(Al<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,21' },
              { ime: 'Ferro-ferri-hornblende<br>(-)', formula: '◻Ca<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Ferro-ferri-katophorite<br>(-)', formula: 'Na(NaCa)(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Ferro-ferri-nyb&oslash;ite<br>(-)', formula: 'NaNa<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Ferro-gedrite<br>(-)', formula: '◻Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Ferro-hornblende<br>(-)', formula: '◻Ca<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Al)(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Ferro-katophorite<br>(-)', formula: 'Na(NaCa)(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Al)(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Ferro-papikeite<br>(-)', formula: 'NaFe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">5</sub>Al<sub class="SubSet4">3</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Ferro-pargasite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Al)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Ferro-richterite<br>(-)', formula: 'Na(NaCa)Fe<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Hallimondite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>(UO<sub class="SubSet4">2</sub>)(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; nH<sub class="SubSet4">2</sub>O', postotak: '0,21' },
              { ime: 'Heflikite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>(Al<sub class="SubSet4">2</sub>Sc)(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)O(OH)', postotak: '0,21' },
              { ime: 'Itoite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>GeO<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Mangano-ferri-eckermannite<br>(-)', formula: 'NaNa<sub class="SubSet4">2</sub>(Mn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Mukhinite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>(Al<sub class="SubSet4">2</sub>V<sup class="SupSet">3+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,21' },
              { ime: 'Piccoliite<br>(-)', formula: 'NaCaMn<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O(OH)', postotak: '0,21' },
              { ime: 'Piemontite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>(Al<sub class="SubSet4">2</sub>Mn<sup class="SupSet">3+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,21' },
              { ime: 'Pohlite<br>(-)', formula: 'Pb<sub class="SubSet4">7</sub>(IO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">4</sub>Cl<sub class="SubSet4">9</sub>', postotak: '0,21' },
              { ime: 'Potassic-arfvedsonite<br>(-)', formula: 'KNa<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Potassic-ferro-pargasite<br>(-)', formula: 'KCa<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Al)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Potassic-ferro-sadanagaite<br>(-)', formula: 'KCa<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">5</sub>Al<sub class="SubSet4">3</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Sapozhnikovite<br>(-)', formula: 'Na<sub class="SubSet4">8</sub>(Al<sub class="SubSet4">6</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">24</sub>)(HS)<sub class="SubSet4">2</sub>', postotak: '0,21' },
              { ime: 'Stibiconite<br>(-)', formula: 'Sb<sup class="SupSet">3+</sup>Sb<sup class="SupSet">5+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(OH)', postotak: '0,21' },
              { ime: 'Yeomanite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>O(OH)Cl', postotak: '0,21' },
              { ime: 'Agaite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>Cu<sup class="SupSet">2+</sup>Te<sup class="SupSet">6+</sup>O<sub class="SubSet4">5</sub>(OH)<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)', postotak: '0,20' },
              { ime: 'Alnaperb&oslash;eite-(Ce)<br>(-)', formula: '(CaCe<sub class="SubSet4">2.5</sub>Na<sub class="SubSet4">0.5</sub>)(Al<sub class="SubSet4">4</sub>)(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>O(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Ciprianiite<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>(ThCa)Al(Be<sub class="SubSet4">0.5</sub>◻<sub class="SubSet4">1.5</sub>)<sub class="SubSet4">&Sigma;2</sub>[B<sub class="SubSet4">4</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">22</sub>](OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Ericssonite<br>(-)', formula: 'BaMn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)O(OH)', postotak: '0,20' },
              { ime: 'Fergusonite-(Ce)<br>(-)', formula: 'CeNbO<sub class="SubSet4">4</sub> &#183; 0.3H<sub class="SubSet4">2</sub>O', postotak: '0,20' },
              { ime: 'Ferro-anthophyllite<br>(-)', formula: '◻Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Ferro-edenite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>(Si<sub class="SubSet4">7</sub>Al)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Ferroericssonite<br>(-)', formula: 'BaFe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)O(OH)', postotak: '0,20' },
              { ime: 'Grandaite<br>(-)', formula: 'Sr<sub class="SubSet4">2</sub>Al(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,20' },
              { ime: 'Grunerite<br>(-)', formula: '◻Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Hastingsite<br>(-)', formula: 'NaCa<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Hejtmanite<br>(-)', formula: 'Ba<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>F<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Hydroxylapatite<br>(-)', formula: 'Ca<sub class="SubSet4">5</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>OH', postotak: '0,20' },
              { ime: 'Hydroxylellestadite<br>(-)', formula: 'Ca<sub class="SubSet4">5</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">1.5</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">1.5</sub>OH', postotak: '0,20' },
              { ime: 'Kennygayite<br>(-)', formula: '[Pb<sub class="SubSet4">4</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>](SO<sub class="SubSet4">4</sub>)', postotak: '0,20' },
              { ime: 'Lithosite<br>(-)', formula: 'K<sub class="SubSet4">3</sub>Al<sub class="SubSet4">2</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>(OH)', postotak: '0,20' },
              { ime: 'Metahaiweeite<br>(-)', formula: 'Ca(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">15</sub> &#183; nH<sub class="SubSet4">2</sub>O', postotak: '0,20' },
              { ime: 'Milarite<br>(-)', formula: 'KCa<sub class="SubSet4">2</sub>(Be<sub class="SubSet4">2</sub>AlSi<sub class="SubSet4">12</sub>)O<sub class="SubSet4">30</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,20' },
              { ime: 'Mineevite-(Y)<br>(-)', formula: 'Na<sub class="SubSet4">25</sub>BaY<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">11</sub>(HCO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>F<sub class="SubSet4">2</sub>Cl', postotak: '0,20' },
              { ime: 'Navrotskyite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>Na<sub class="SubSet4">10</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">9</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,20' },
              { ime: 'Niigataite<br>(-)', formula: 'CaSrAl<sub class="SubSet4">3</sub>[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,20' },
              { ime: 'Nosean<br>(-)', formula: 'Na<sub class="SubSet4">8</sub>(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">6</sub>)O<sub class="SubSet4">24</sub>(SO<sub class="SubSet4">4</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,20' },
              { ime: 'Potassic-ferro-ferri-sadanagaite<br>(-)', formula: 'KCa<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">5</sub>Al<sub class="SubSet4">3</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Potassic-ferro-ferri-taramite<br>(-)', formula: 'K(NaCa)(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Potassic-hastingsite<br>(-)', formula: 'KCa<sub class="SubSet4">2</sub>(Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup>)(Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Proto-ferro-anthophyllite<br>(-)', formula: '◻Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Proto-ferro-suenoite<br>(-)', formula: '◻Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Sidpietersite<br>(-)', formula: 'Pb<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>(S<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>)O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Somersetite<br>(-)', formula: 'Pb<sub class="SubSet4">8</sub>O(OH)<sub class="SubSet4">4</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">5</sub>', postotak: '0,20' },
              { ime: 'Tadzhikite-(Ce)<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Ce<sub class="SubSet4">2</sub>Ti◻(B<sub class="SubSet4">4</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">22</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Tavagnascoite<br>(-)', formula: 'Bi<sub class="SubSet4">4</sub>O<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Tombstoneite<br>(-)', formula: '(Ca<sub class="SubSet4">0.5</sub>Pb<sub class="SubSet4">0.5</sub>)Pb<sub class="SubSet4">3</sub>Cu<sup class="SupSet">2+</sup><sub class="SubSet4">6</sub>Te<sup class="SupSet">6+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(Te<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub>(Se<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,20' },
              { ime: 'T&ouml;rnebohmite-(Ce)<br>(-)', formula: 'Ce<sub class="SubSet4">2</sub>Al(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,20' },
              { ime: 'T&ouml;rnebohmite-(La)<br>(-)', formula: 'La<sub class="SubSet4">2</sub>Al(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,20' },
              { ime: 'Zinconigerite-2<em>N</em>1<em>S</em><br>(-)', formula: 'ZnSn<sub class="SubSet4">2</sub>Al<sub class="SubSet4">12</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,20' },
              { ime: 'Aldomarinoite<br>(-)', formula: 'Sr<sub class="SubSet4">2</sub>Mn<sup class="SupSet">3+</sup>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,19' },
              { ime: 'Allanite-(Y)<br>(-)', formula: 'CaY(Al<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,19' },
              { ime: 'Axinite-(Mg)<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Mg<sub class="SubSet4">2</sub>Al<sub class="SubSet4">4</sub>[B<sub class="SubSet4">2</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">30</sub>](OH)<sub class="SubSet4">2</sub>', postotak: '0,19' },
              { ime: 'Bafertisite<br>(-)', formula: 'Ba<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>F<sub class="SubSet4">2</sub>', postotak: '0,19' },
              { ime: 'Bismutoferrite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Bi(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,19' },
              { ime: 'Dukeite<br>(-)', formula: 'Bi<sup class="SupSet">3+</sup><sub class="SubSet4">24</sub>Cr<sup class="SupSet">6+</sup><sub class="SubSet4">8</sub>O<sub class="SubSet4">57</sub>(OH)<sub class="SubSet4">6</sub> &#183; 3H<sub class="SubSet4">2</sub>O', postotak: '0,19' },
              { ime: 'Epidote-(Sr)<br>(-)', formula: 'CaSr(Al<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,19' },
              { ime: 'Fluorcarletonite<br>(-)', formula: 'KNa<sub class="SubSet4">4</sub>Ca<sub class="SubSet4">4</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">18</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">4</sub>F &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,19' },
              { ime: 'Heneuite<br>(-)', formula: 'CaMg<sub class="SubSet4">5</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(CO<sub class="SubSet4">3</sub>)(OH)', postotak: '0,19' },
              { ime: 'Hydroxycalciomicrolite<br>(-)', formula: 'Ca<sub class="SubSet4">1.5</sub>Ta<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(OH)', postotak: '0,19' },
              { ime: 'Joesmithite<br>(-)', formula: 'Pb<sup class="SupSet">2+</sup>Ca<sub class="SubSet4">2</sub>(Mg<sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>)(Si<sub class="SubSet4">6</sub>Be<sub class="SubSet4">2</sub>)O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,19' },
              { ime: 'Leadhillite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">4</sub>)(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,19' },
              { ime: 'Macphersonite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">4</sub>)(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,19' },
              { ime: 'Margaritasite<br>(-)', formula: 'Cs<sub class="SubSet4">2</sub>(UO<sub class="SubSet4">2</sub>)<sub class="SubSet4">2</sub>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,19' },
              { ime: 'Marinellite<br>(-)', formula: 'Na<sub class="SubSet4">42</sub>Ca<sub class="SubSet4">6</sub>Al<sub class="SubSet4">36</sub>Si<sub class="SubSet4">36</sub>O<sub class="SubSet4">144</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">8</sub>Cl<sub class="SubSet4">2</sub> &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,19' },
              { ime: 'Penfieldite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Cl<sub class="SubSet4">3</sub>(OH)', postotak: '0,19' },
              { ime: 'Perb&oslash;eite-(La)<br>(-)', formula: '(CaLa<sub class="SubSet4">3</sub>)(Al<sub class="SubSet4">3</sub>Fe<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]<sub class="SubSet4">3</sub>O(OH)<sub class="SubSet4">2</sub>', postotak: '0,19' },
              { ime: 'Piemontite-(Sr)<br>(-)', formula: 'CaSr(Al<sub class="SubSet4">2</sub>Mn<sup class="SupSet">3+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,19' },
              { ime: 'Radek&scaron;kodaite-(Ce)<br>(-)', formula: '(CaCe<sub class="SubSet4">5</sub>)(Al<sub class="SubSet4">4</sub>Fe<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]<sub class="SubSet4">5</sub>O(OH)<sub class="SubSet4">3</sub>', postotak: '0,19' },
              { ime: 'Radek&scaron;kodaite-(La)<br>(-)', formula: '(CaLa<sub class="SubSet4">5</sub>)(Al<sub class="SubSet4">4</sub>Fe<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]<sub class="SubSet4">5</sub>O(OH)<sub class="SubSet4">3</sub>', postotak: '0,19' },
              { ime: 'Roymillerite<br>(-)', formula: 'Pb<sub class="SubSet4">24</sub>Mg<sub class="SubSet4">9</sub>(Si<sub class="SubSet4">10</sub>O<sub class="SubSet4">28</sub>)(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">10</sub>(BO<sub class="SubSet4">3</sub>)(SiO<sub class="SubSet4">4</sub>)(OH)<sub class="SubSet4">13</sub>O<sub class="SubSet4">5</sub>', postotak: '0,19' },
              { ime: 'Shcherbakovite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>NaTi<sub class="SubSet4">2</sub>O(OH)Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>', postotak: '0,19' },
              { ime: 'Susannite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>(SO<sub class="SubSet4">4</sub>)(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,19' },
              { ime: 'Uranosphaerite<br>(-)', formula: 'Bi(UO<sub class="SubSet4">2</sub>)O<sub class="SubSet4">2</sub>(OH)', postotak: '0,19' },
              { ime: 'V&auml;stmanlandite-(Ce)<br>(-)', formula: 'Ce<sub class="SubSet4">3</sub>CaMg<sub class="SubSet4">2</sub>Al<sub class="SubSet4">2</sub>Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">19</sub>(OH)<sub class="SubSet4">2</sub>F', postotak: '0,19' },
              { ime: 'Zeravshanite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Cs<sub class="SubSet4">4</sub>Zr<sub class="SubSet4">3</sub>Si<sub class="SubSet4">18</sub>O<sub class="SubSet4">45</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,19' },
              { ime: 'Abellaite<br>(-)', formula: 'NaPb<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,18' },
              { ime: 'Artsmithite<br>(-)', formula: 'Hg<sup class="SupSet">1+</sup><sub class="SubSet4">4</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">1.74</sub>(OH)<sub class="SubSet4">1.78</sub>', postotak: '0,18' },
              { ime: 'Axinite-(Fe)<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Al<sub class="SubSet4">4</sub>[B<sub class="SubSet4">2</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">30</sub>](OH)<sub class="SubSet4">2</sub>', postotak: '0,18' },
              { ime: 'Axinite-(Mn)<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Al<sub class="SubSet4">4</sub>[B<sub class="SubSet4">2</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">30</sub>](OH)<sub class="SubSet4">2</sub>', postotak: '0,18' },
              { ime: 'Babingtonite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup>Fe<sup class="SupSet">3+</sup>Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">14</sub>(OH)', postotak: '0,18' },
              { ime: 'Barstowite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>(CO<sub class="SubSet4">3</sub>)Cl<sub class="SubSet4">6</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,18' },
              { ime: 'Devitoite<br>(-)', formula: 'Ba<sub class="SubSet4">6</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">7</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">12</sub>)<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,18' },
              { ime: 'Dissakisite-(Ce)<br>(-)', formula: 'CaCe(Al<sub class="SubSet4">2</sub>Mg)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,18' },
              { ime: 'Dissakisite-(La)<br>(-)', formula: 'CaLa(Al<sub class="SubSet4">2</sub>Mg)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,18' },
              { ime: 'Dollaseite-(Ce)<br>(-)', formula: 'CaCe(Mg<sub class="SubSet4">2</sub>Al)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]F(OH)', postotak: '0,18' },
              { ime: 'Ferri-hellandite-(Ce)<br>(-)', formula: '(Ca<sub class="SubSet4">3</sub>Ce)Ce<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>◻<sub class="SubSet4">2</sub>B<sub class="SubSet4">4</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,18' },
              { ime: 'Ferriperb&oslash;eite-(Ce)<br>(-)', formula: '(CaCe<sub class="SubSet4">3</sub>)(Fe<sup class="SupSet">3+</sup>Al<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup>)(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>O(OH)<sub class="SubSet4">2</sub>', postotak: '0,18' },
              { ime: 'Ferriperb&oslash;eite-(La)<br>(-)', formula: '(CaLa<sub class="SubSet4">3</sub>)(Fe<sup class="SupSet">3+</sup>Al<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]<sub class="SubSet4">3</sub>O(OH)<sub class="SubSet4">2</sub>', postotak: '0,18' },
              { ime: 'Georgerobinsonite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>(CrO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>FCl', postotak: '0,18' },
              { ime: 'Hechtsbergite<br>(-)', formula: 'Bi<sub class="SubSet4">2</sub>O(VO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,18' },
              { ime: 'Hyttsj&ouml;ite<br>(-)', formula: 'Pb<sub class="SubSet4">18</sub>Ba<sub class="SubSet4">2</sub>Ca<sub class="SubSet4">5</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Si<sub class="SubSet4">30</sub>O<sub class="SubSet4">90</sub>Cl &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,18' },
              { ime: 'Magbasite<br>(-)', formula: 'KBaFe<sup class="SupSet">3+</sup>Mg<sub class="SubSet4">7</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">22</sub>(OH)<sub class="SubSet4">2</sub>F<sub class="SubSet4">6</sub>', postotak: '0,18' },
              { ime: 'Magnesiodumortierite<br>(-)', formula: 'MgAl<sub class="SubSet4">6</sub>BSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">17</sub>(OH)', postotak: '0,18' },
              { ime: 'Manganbabingtonite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup>Fe<sup class="SupSet">3+</sup>Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">14</sub>(OH)', postotak: '0,18' },
              { ime: 'Perb&oslash;eite-(Ce)<br>(-)', formula: '(CaCe<sub class="SubSet4">3</sub>)(Al<sub class="SubSet4">3</sub>Fe<sup class="SupSet">2+</sup>)(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>O(OH)<sub class="SubSet4">2</sub>', postotak: '0,18' },
              { ime: 'Smrkovecite<br>(-)', formula: 'Bi<sub class="SubSet4">2</sub>O(OH)(PO<sub class="SubSet4">4</sub>)', postotak: '0,18' },
              { ime: 'Sverigeite<br>(-)', formula: 'NaBe<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>SnSi<sub class="SubSet4">3</sub>O<sub class="SubSet4">12</sub>(OH)', postotak: '0,18' },
              { ime: 'Tweddillite<br>(-)', formula: 'CaSrMn<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Al(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)O(OH)', postotak: '0,18' },
              { ime: 'Allanite-(Ce)<br>(-)', formula: 'CaCe(Al<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,17' },
              { ime: 'Allanite-(La)<br>(-)', formula: 'CaLa(Al<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,17' },
              { ime: 'Allanite-(Nd)<br>(-)', formula: 'CaNd(Al<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,17' },
              { ime: 'Atelestite<br>(-)', formula: 'Bi<sub class="SubSet4">2</sub>O(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,17' },
              { ime: 'Ferriakasakaite-(La)<br>(-)', formula: 'CaLaFe<sup class="SupSet">3+</sup>AlMn<sup class="SupSet">2+</sup>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)O(OH)', postotak: '0,17' },
              { ime: 'Gamagarite<br>(-)', formula: 'Ba<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,17' },
              { ime: 'Golyshevite<br>(-)', formula: 'Na<sub class="SubSet4">10</sub>Ca<sub class="SubSet4">9</sub>Zr<sub class="SubSet4">3</sub>Fe<sub class="SubSet4">2</sub>SiNb(Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">9</sub>)<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">9</sub>O<sub class="SubSet4">27</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">3</sub>(CO<sub class="SubSet4">3</sub>) &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,17' },
              { ime: 'Hydroxyplumbopyrochlore<br>(-)', formula: '(Pb<sub class="SubSet4">1.5</sub>◻<sub class="SubSet4">0.5</sub>)Nb<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(OH)', postotak: '0,17' },
              { ime: 'Khristovite-(Ce)<br>(-)', formula: 'CaCe(MgAlMn<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]F(OH)', postotak: '0,17' },
              { ime: 'Kristiansenite<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Sc<sub class="SubSet4">2</sub>Sn<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>OH)<sub class="SubSet4">2</sub>', postotak: '0,17' },
              { ime: 'Lithiomarsturite<br>(-)', formula: 'LiCaMn<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">14</sub>(OH)', postotak: '0,17' },
              { ime: 'Manganiakasakaite-(La)<br>(-)', formula: 'CaLa(Mn<sup class="SupSet">3+</sup>AlMn<sup class="SupSet">2+</sup>)(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)O(OH)', postotak: '0,17' },
              { ime: 'Marsturite<br>(-)', formula: 'NaCaMn<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">14</sub>(OH)', postotak: '0,17' },
              { ime: 'Nambulite<br>(-)', formula: 'LiMn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">14</sub>(OH)', postotak: '0,17' },
              { ime: 'Sergevanite<br>(-)', formula: 'Na<sub class="SubSet4">15</sub>(Ca<sub class="SubSet4">3</sub>Mn<sub class="SubSet4">3</sub>)(Na<sub class="SubSet4">2</sub>Fe)Zr<sub class="SubSet4">3</sub>Si<sub class="SubSet4">26</sub>O<sub class="SubSet4">72</sub>(OH)<sub class="SubSet4">3</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,17' },
              { ime: 'Silesiaite<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>Sn<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>OH)<sub class="SubSet4">2</sub>', postotak: '0,17' },
              { ime: 'Steudelite<br>(-)', formula: 'Na<sub class="SubSet4">3</sub>◻(K<sub class="SubSet4">17</sub>Ca<sub class="SubSet4">7</sub>)Ca<sub class="SubSet4">4</sub>(Al<sub class="SubSet4">24</sub>Si<sub class="SubSet4">24</sub>O<sub class="SubSet4">96</sub>)(SO<sub class="SubSet4">3</sub>)<sub class="SubSet4">6</sub>F<sub class="SubSet4">6</sub> &#183; 4H<sub class="SubSet4">2</sub>O', postotak: '0,17' },
              { ime: 'Timroseite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Cu<sub class="SubSet4">5</sub>(TeO<sub class="SubSet4">6</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,17' },
              { ime: 'Tinzenite<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Al<sub class="SubSet4">4</sub>[B<sub class="SubSet4">2</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">30</sub>](OH)<sub class="SubSet4">2</sub>', postotak: '0,17' },
              { ime: 'Tiragalloite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>As<sup class="SupSet">5+</sup>Si<sub class="SubSet4">3</sub>O<sub class="SubSet4">12</sub>(OH)', postotak: '0,17' },
              { ime: 'Tokyoite<br>(-)', formula: 'Ba<sub class="SubSet4">2</sub>Mn<sup class="SupSet">3+</sup>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>OH', postotak: '0,17' },
              { ime: 'Uedaite-(Ce)<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup>CeAl<sub class="SubSet4">2</sub>Fe<sup class="SupSet">2+</sup>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)O(OH)', postotak: '0,17' },
              { ime: 'Vanadoallanite-(La)<br>(-)', formula: 'CaLa<sup class="SupSet">3+</sup>V<sup class="SupSet">3+</sup>AlFe<sup class="SupSet">2+</sup>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)O(OH)', postotak: '0,17' },
              { ime: 'Vielleaureite-(Ce)<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup>Ce(MgAlMn<sup class="SupSet">2+</sup>)(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)F(OH)', postotak: '0,17' },
              { ime: 'Anzaite-(Ce)<br>(-)', formula: 'Ce<sub class="SubSet4">4</sub>Fe<sup class="SupSet">2+</sup>Ti<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,16' },
              { ime: 'Canosioite<br>(-)', formula: 'Ba<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,16' },
              { ime: 'Farneseite<br>(-)', formula: 'Na<sub class="SubSet4">46</sub>Ca<sub class="SubSet4">10</sub>(Si<sub class="SubSet4">42</sub>Al<sub class="SubSet4">42</sub>O<sub class="SubSet4">168</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">12</sub> &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,16' },
              { ime: 'Ferriakasakaite-(Ce)<br>(-)', formula: 'CaCeFe<sup class="SupSet">3+</sup>AlMn<sup class="SupSet">2+</sup>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)O(OH)', postotak: '0,16' },
              { ime: 'Ferriallanite-(Ce)<br>(-)', formula: 'CaCe(Fe<sup class="SupSet">3+</sup>AlFe<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,16' },
              { ime: 'Ferriallanite-(La)<br>(-)', formula: 'CaLa(Fe<sup class="SupSet">3+</sup>AlFe<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,16' },
              { ime: 'Ferriandrosite-(Ce)<br>(-)', formula: 'MnCe(Fe<sup class="SupSet">3+</sup>AlMn<sup class="SupSet">2+</sup>)(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)O(OH)', postotak: '0,16' },
              { ime: 'Ferriandrosite-(La)<br>(-)', formula: 'MnLaFe<sup class="SupSet">3+</sup>AlMn<sup class="SupSet">2+</sup>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)(SiO<sub class="SubSet4">4</sub>)O(OH)', postotak: '0,16' },
              { ime: 'Fluorcanasite<br>(-)', formula: 'K<sub class="SubSet4">3</sub>Na<sub class="SubSet4">3</sub>Ca<sub class="SubSet4">5</sub>Si<sub class="SubSet4">12</sub>O<sub class="SubSet4">30</sub>F<sub class="SubSet4">4</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,16' },
              { ime: 'Johnbaumite<br>(-)', formula: 'Ca<sub class="SubSet4">5</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)', postotak: '0,16' },
              { ime: 'Kozłowskiite<br>(-)', formula: 'Ca<sub class="SubSet4">4</sub>Fe<sup class="SupSet">2+</sup>Sn<sub class="SubSet4">3</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>OH)<sub class="SubSet4">2</sub>', postotak: '0,16' },
              { ime: 'Lombardoite<br>(-)', formula: 'Ba<sub class="SubSet4">2</sub>Mn<sup class="SupSet">3+</sup>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,16' },
              { ime: 'Mambertiite<br>(-)', formula: 'BiMo<sup class="SupSet">5+</sup><sub class="SubSet4">2.8</sub>O<sub class="SubSet4">8</sub>(OH)', postotak: '0,16' },
              { ime: 'Manganiandrosite-(Ce)<br>(-)', formula: 'MnCe(Mn<sup class="SupSet">3+</sup>AlMn<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,16' },
              { ime: 'Manganiandrosite-(La)<br>(-)', formula: 'MnLa(Mn<sup class="SupSet">3+</sup>AlMn<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,16' },
              { ime: 'Namibite<br>(-)', formula: 'Cu(BiO)<sub class="SubSet4">2</sub>(VO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,16' },
              { ime: 'Natronambulite<br>(-)', formula: 'NaMn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">14</sub>(OH)', postotak: '0,16' },
              { ime: 'Piemontite-(Pb)<br>(-)', formula: 'CaPb(Al<sub class="SubSet4">2</sub>Mn<sup class="SupSet">3+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,16' },
              { ime: 'Plumbonacrite<br>(-)', formula: 'Pb<sub class="SubSet4">5</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>O(OH)<sub class="SubSet4">2</sub>', postotak: '0,16' },
              { ime: 'Schwartzembergite<br>(-)', formula: 'Pb<sup class="SupSet">2+</sup><sub class="SubSet4">5</sub>H<sub class="SubSet4">2</sub>I<sup class="SupSet">3+</sup>O<sub class="SubSet4">6</sub>Cl<sub class="SubSet4">3</sub>', postotak: '0,16' },
              { ime: 'Tashelgite<br>(-)', formula: 'CaMgFe<sup class="SupSet">2+</sup>Al<sub class="SubSet4">9</sub>O<sub class="SubSet4">16</sub>(OH)', postotak: '0,16' },
              { ime: 'Terranovaite<br>(-)', formula: 'NaCaAl<sub class="SubSet4">3</sub>Si<sub class="SubSet4">17</sub>O<sub class="SubSet4">40</sub> &#183; ~8H<sub class="SubSet4">2</sub>O', postotak: '0,16' },
              { ime: 'Tomichite<br>(-)', formula: 'V<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>Ti<sup class="SupSet">4+</sup><sub class="SubSet4">3</sub>As<sup class="SupSet">3+</sup>O<sub class="SubSet4">13</sub>(OH)', postotak: '0,16' },
              { ime: 'Vanadoandrosite-(Ce)<br>(-)', formula: 'MnCe(V<sup class="SupSet">3+</sup>AlMn<sup class="SupSet">2+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,16' },
              { ime: 'Zoisite-(Pb)<br>(-)', formula: 'CaPbAl<sub class="SubSet4">3</sub>[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,16' },
              { ime: 'Anandite<br>(-)', formula: 'BaFe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>(Si<sub class="SubSet4">3</sub>Fe<sup class="SupSet">3+</sup>)O<sub class="SubSet4">10</sub>S(OH)', postotak: '0,15' },
              { ime: 'Bushmakinite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Al(PO<sub class="SubSet4">4</sub>)(VO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,15' },
              { ime: 'Delhuyarite-(Ce)<br>(-)', formula: 'Ce<sub class="SubSet4">4</sub>Mg(Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>W)◻(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,15' },
              { ime: 'Graeserite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>Ti<sub class="SubSet4">3</sub>As<sup class="SupSet">3+</sup>O<sub class="SubSet4">13</sub>(OH)', postotak: '0,15' },
              { ime: 'Hancockite<br>(-)', formula: 'CaPb(Al<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>)[Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>][SiO<sub class="SubSet4">4</sub>]O(OH)', postotak: '0,15' },
              { ime: 'Katayamalite<br>(-)', formula: 'KLi<sub class="SubSet4">3</sub>Ca<sub class="SubSet4">7</sub>Ti<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">3</sub>)<sub class="SubSet4">12</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,15' },
              { ime: 'Leucostaurite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>[B<sub class="SubSet4">5</sub>O<sub class="SubSet4">9</sub>]Cl &#183; 0.5H<sub class="SubSet4">2</sub>O', postotak: '0,15' },
              { ime: 'Nabiasite<br>(-)', formula: 'BaMn<sub class="SubSet4">9</sub>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,15' },
              { ime: 'Tsumebite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Cu(PO<sub class="SubSet4">4</sub>)(SO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,15' },
              { ime: 'Zinconigerite-6<em>N</em>6<em>S</em><br>(-)', formula: 'Zn<sub class="SubSet4">3</sub>Sn<sub class="SubSet4">2</sub>Al<sub class="SubSet4">16</sub>O<sub class="SubSet4">30</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,15' },
              { ime: 'Arrojadite-(BaNa)<br>(-)', formula: 'BaNa<sub class="SubSet4">3</sub>(NaCa)Fe<sup class="SupSet">2+</sup><sub class="SubSet4">13</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">11</sub>(PO<sub class="SubSet4">3</sub>OH)(OH)<sub class="SubSet4">2</sub>', postotak: '0,14' },
              { ime: 'Arrojadite-(KFe)<br>(-)', formula: '(KNa)Fe<sup class="SupSet">2+</sup>(CaNa<sub class="SubSet4">2</sub>)Fe<sup class="SupSet">2+</sup><sub class="SubSet4">13</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">11</sub>(PO<sub class="SubSet4">3</sub>OH)(OH)<sub class="SubSet4">2</sub>', postotak: '0,14' },
              { ime: 'Arrojadite-(KNa)<br>(-)', formula: 'KNa<sub class="SubSet4">3</sub>(CaNa<sub class="SubSet4">2</sub>)Fe<sup class="SupSet">2+</sup><sub class="SubSet4">13</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">11</sub>(PO<sub class="SubSet4">3</sub>OH)(OH)<sub class="SubSet4">2</sub>', postotak: '0,14' },
              { ime: 'Arrojadite-(SrFe)<br>(-)', formula: 'SrFe<sup class="SupSet">2+</sup>(CaNa<sub class="SubSet4">2</sub>)Fe<sup class="SupSet">2+</sup><sub class="SubSet4">13</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">11</sub>(PO<sub class="SubSet4">3</sub>OH)(OH)<sub class="SubSet4">2</sub>', postotak: '0,14' },
              { ime: 'Arsentsumebite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Cu(AsO<sub class="SubSet4">4</sub>)(SO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,14' },
              { ime: 'Bario-orthojoaquinite<br>(-)', formula: 'Ba<sub class="SubSet4">4</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Ti<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(SiO<sub class="SubSet4">3</sub>)<sub class="SubSet4">8</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,14' },
              { ime: 'Brackebuschite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Mn<sup class="SupSet">3+</sup>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,14' },
              { ime: 'Calder&oacute;nite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,14' },
              { ime: 'Cuprodongchuanite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>CuZn<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,14' },
              { ime: 'Damaraite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>O<sub class="SubSet4">2</sub>(OH)Cl', postotak: '0,14' },
              { ime: 'Derbylite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">4</sub>Ti<sup class="SupSet">4+</sup><sub class="SubSet4">3</sub>Sb<sup class="SupSet">3+</sup>O<sub class="SubSet4">13</sub>(OH)', postotak: '0,14' },
              { ime: 'Dongchuanite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>ZnZn<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,14' },
              { ime: 'Dutkevichite-(Ce)<br>(-)', formula: 'NaZnBa<sub class="SubSet4">2</sub>Ce<sub class="SubSet4">2</sub>Ti<sub class="SubSet4">2</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">26</sub>F &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,14' },
              { ime: 'Embreyite<br>(-)', formula: 'Pb<sub class="SubSet4">5</sub>(CrO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,14' },
              { ime: 'Ferribushmakinite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>Fe<sup class="SupSet">3+</sup>(PO<sub class="SubSet4">4</sub>)(VO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,14' },
              { ime: 'J&oslash;rgensenite<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>Sr<sub class="SubSet4">14</sub>Na<sub class="SubSet4">2</sub>Al<sub class="SubSet4">12</sub>F<sub class="SubSet4">64</sub>(OH)<sub class="SubSet4">4</sub>', postotak: '0,14' },
              { ime: 'Magnesiobeltrandoite-2<em>N</em>3<em>S</em><br>(-)', formula: '(Mg<sub class="SubSet4">6</sub>Al<sub class="SubSet4">2</sub>)(Al<sub class="SubSet4">18</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>)O<sub class="SubSet4">38</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,14' },
              { ime: 'Manganoarrojadite-(KNa)<br>(-)', formula: 'KNa<sub class="SubSet4">5</sub>MnFe<sub class="SubSet4">13</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">11</sub>(PO<sub class="SubSet4">3</sub>OH)(OH)<sub class="SubSet4">2</sub>', postotak: '0,14' },
              { ime: 'Sigismundite<br>(-)', formula: 'BaFe<sup class="SupSet">2+</sup>(CaNa<sub class="SubSet4">2</sub>)Fe<sup class="SupSet">2+</sup><sub class="SubSet4">13</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">11</sub>(PO<sub class="SubSet4">3</sub>OH)(OH)<sub class="SubSet4">2</sub>', postotak: '0,14' },
              { ime: 'Vauquelinite<br>(-)', formula: 'CuPb<sub class="SubSet4">2</sub>(CrO<sub class="SubSet4">4</sub>)(PO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,14' },
              { ime: 'Yoshimuraite<br>(-)', formula: 'Ba<sub class="SubSet4">4</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Ti<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,14' },
              { ime: 'Zinkgruvanite<br>(-)', formula: 'Ba<sub class="SubSet4">4</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,14' },
              { ime: 'Arrojadite-(PbFe)<br>(-)', formula: 'PbFe<sup class="SupSet">2+</sup>(CaNa<sub class="SubSet4">2</sub>)Fe<sup class="SupSet">2+</sup><sub class="SubSet4">13</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">11</sub>(PO<sub class="SubSet4">3</sub>OH)(OH)<sub class="SubSet4">2</sub>', postotak: '0,13' },
              { ime: 'Cassedanneite<br>(-)', formula: 'Pb<sub class="SubSet4">5</sub>(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(CrO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,13' },
              { ime: 'Cuprozheshengite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>CuZn<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,13' },
              { ime: 'Fornacite<br>(-)', formula: 'CuPb<sub class="SubSet4">2</sub>(CrO<sub class="SubSet4">4</sub>)(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,13' },
              { ime: 'Molybdofornacite<br>(-)', formula: 'CuPb<sub class="SubSet4">2</sub>(MoO<sub class="SubSet4">4</sub>)(AsO<sub class="SubSet4">4</sub>)(OH)', postotak: '0,13' },
              { ime: 'Piergorite-(Ce)<br>(-)', formula: 'Ca<sub class="SubSet4">8</sub>Ce<sub class="SubSet4">2</sub>AlLiSi<sub class="SubSet4">6</sub>B<sub class="SubSet4">8</sub>O<sub class="SubSet4">36</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,13' },
              { ime: 'Pottsite<br>(-)', formula: '(Pb<sub class="SubSet4">3</sub>Bi)Bi(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,13' },
              { ime: 'Rongibbsite<br>(-)', formula: 'Pb<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">4</sub>Al)O<sub class="SubSet4">11</sub>(OH)', postotak: '0,13' },
              { ime: 'Tinaksite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>NaCa<sub class="SubSet4">2</sub>TiSi<sub class="SubSet4">7</sub>O<sub class="SubSet4">18</sub>(OH)O', postotak: '0,13' },
              { ime: 'Tokkoite<br>(-)', formula: 'K<sub class="SubSet4">2</sub>Ca<sub class="SubSet4">4</sub>Si<sub class="SubSet4">7</sub>O<sub class="SubSet4">18</sub>(OH)F', postotak: '0,13' },
              { ime: 'Zheshengite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>ZnZn<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,13' },
              { ime: 'Arsenmedaite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">6</sub>As<sup class="SupSet">5+</sup>Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">18</sub>(OH)', postotak: '0,12' },
              { ime: 'Bornemanite<br>(-)', formula: 'Na<sub class="SubSet4">6</sub>(Na◻)Ba<sub class="SubSet4">2</sub>Ti<sub class="SubSet4">2</sub>Nb<sub class="SubSet4">2</sub>(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">4</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>O<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>F<sub class="SubSet4">2</sub>', postotak: '0,12' },
              { ime: 'Botuobinskite<br>(-)', formula: 'SrFe<sup class="SupSet">2+</sup>(Ti<sup class="SupSet">4+</sup><sub class="SubSet4">12</sub>Cr<sup class="SupSet">3+</sup><sub class="SubSet4">6</sub>)Mg<sub class="SubSet4">2</sub>[O<sub class="SubSet4">36</sub>(OH)<sub class="SubSet4">2</sub>]', postotak: '0,12' },
              { ime: 'Giuseppettite<br>(-)', formula: 'Na<sub class="SubSet4">42</sub>K<sub class="SubSet4">16</sub>Ca<sub class="SubSet4">6</sub>Si<sub class="SubSet4">48</sub>Al<sub class="SubSet4">48</sub>O<sub class="SubSet4">192</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">10</sub>Cl<sub class="SubSet4">2</sub> &#183; 5H<sub class="SubSet4">2</sub>O', postotak: '0,12' },
              { ime: 'Guangyuanite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>Cl<sub class="SubSet4">3</sub>(Se<sup class="SupSet">4+</sup>O<sub class="SubSet4">3</sub>)(OH)', postotak: '0,12' },
              { ime: 'Karibibite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>(As<sup class="SupSet">3+</sup>O<sub class="SubSet4">2</sub>)<sub class="SubSet4">4</sub>(As<sup class="SupSet">3+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">5</sub>)(OH)', postotak: '0,12' },
              { ime: 'Magnesioh&ouml;gbomite-2<em>N</em>4S<br>(-)', formula: '[(Mg<sub class="SubSet4">8.43</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">1.57</sub>)<sub class="SubSet4">&Sigma;=10</sub>Al<sub class="SubSet4">22</sub>Ti<sup class="SupSet">4+</sup><sub class="SubSet4">2</sub>O<sub class="SubSet4">46</sub>(OH)<sub class="SubSet4">2</sub>]', postotak: '0,12' },
              { ime: 'Magnesioh&ouml;gbomite-6<em>N</em>12<em>S</em><br>(-)', formula: 'Mg<sub class="SubSet4">5</sub>Al<sub class="SubSet4">11</sub>TiO<sub class="SubSet4">23</sub>(OH)', postotak: '0,12' },
              { ime: 'Medaite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">6</sub>V<sup class="SupSet">5+</sup>Si<sub class="SubSet4">5</sub>O<sub class="SubSet4">18</sub>(OH)', postotak: '0,12' },
              { ime: 'Petitjeanite<br>(-)', formula: 'Bi<sub class="SubSet4">3</sub>O(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,12' },
              { ime: 'Samuelsonite<br>(-)', formula: 'Ca<sub class="SubSet4">9</sub>Mn<sup class="SupSet">2+</sup><sub class="SubSet4">4</sub>Al<sub class="SubSet4">2</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">10</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,12' },
              { ime: 'Senkevichite<br>(-)', formula: 'CsNaKCa<sub class="SubSet4">2</sub>TiOSi<sub class="SubSet4">7</sub>O<sub class="SubSet4">18</sub>(OH)', postotak: '0,12' },
              { ime: 'Simpsonite<br>(-)', formula: 'Al<sub class="SubSet4">4</sub>Ta<sub class="SubSet4">3</sub>O<sub class="SubSet4">13</sub>(OH)', postotak: '0,12' },
              { ime: 'Staurolite<br>(-)', formula: 'Fe<sup class="SupSet">2+</sup><sub class="SubSet4">2</sub>Al<sub class="SubSet4">9</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">23</sub>(OH)', postotak: '0,12' },
              { ime: 'Zincostaurolite<br>(-)', formula: 'Zn<sub class="SubSet4">2</sub>Al<sub class="SubSet4">9</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">23</sub>(OH)', postotak: '0,12' },
              { ime: 'Armangite<br>(-)', formula: 'Mn<sup class="SupSet">2+</sup><sub class="SubSet4">26</sub>[As<sup class="SupSet">3+</sup><sub class="SubSet4">6</sub>(OH)<sub class="SubSet4">4</sub>O<sub class="SubSet4">14</sub>][As<sup class="SupSet">3+</sup><sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>]<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)', postotak: '0,11' },
              { ime: 'Blixite<br>(-)', formula: 'Pb<sub class="SubSet4">8</sub>O<sub class="SubSet4">5</sub>(OH)<sub class="SubSet4">2</sub>Cl<sub class="SubSet4">4</sub>', postotak: '0,11' },
              { ime: 'Fencooperite<br>(-)', formula: 'Ba<sub class="SubSet4">6</sub>Fe<sup class="SupSet">3+</sup><sub class="SubSet4">3</sub>Si<sub class="SubSet4">8</sub>O<sub class="SubSet4">23</sub>(CO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>Cl<sub class="SubSet4">3</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,11' },
              { ime: 'Mereheadite<br>(-)', formula: 'Pb<sub class="SubSet4">47</sub>O<sub class="SubSet4">24</sub>(OH)<sub class="SubSet4">13</sub>Cl<sub class="SubSet4">25</sub>(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(CO<sub class="SubSet4">3</sub>)', postotak: '0,11' },
              { ime: 'Preisingerite<br>(-)', formula: 'Bi<sub class="SubSet4">3</sub>O(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,11' },
              { ime: 'Schumacherite<br>(-)', formula: 'Bi<sub class="SubSet4">3</sub>O(VO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)', postotak: '0,11' },
              { ime: 'Thorikosite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>O<sub class="SubSet4">3</sub>Sb<sup class="SupSet">3+</sup>(OH)Cl<sub class="SubSet4">2</sub>', postotak: '0,11' },
              { ime: 'Thorneite<br>(-)', formula: 'Pb<sub class="SubSet4">6</sub>(Te<sub class="SubSet4">2</sub>O<sub class="SubSet4">10</sub>)(CO<sub class="SubSet4">3</sub>)Cl<sub class="SubSet4">2</sub>(H<sub class="SubSet4">2</sub>O)', postotak: '0,11' },
              { ime: 'Boojumite<br>(-)', formula: 'Pb<sub class="SubSet4">8</sub>O<sub class="SubSet4">4</sub>(OH)<sub class="SubSet4">2</sub>(S<sub class="SubSet4">2</sub>O<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>', postotak: '0,10' },
              { ime: 'Olenite<br>(-)', formula: 'NaAl<sub class="SubSet4">3</sub>Al<sub class="SubSet4">6</sub>(Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">18</sub>)(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">3</sub>O<sub class="SubSet4">3</sub>(OH)', postotak: '0,10' },
              { ime: 'Trigonite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>Mn<sup class="SupSet">2+</sup>(AsO<sub class="SubSet4">3</sub>)<sub class="SubSet4">2</sub>(AsO<sub class="SubSet4">2</sub>OH)', postotak: '0,10' },
              { ime: 'Whitlockite<br>(-)', formula: 'Ca<sub class="SubSet4">9</sub>Mg(PO<sub class="SubSet4">3</sub>OH)(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub>', postotak: '0,10' },
              { ime: 'Dickinsonite-(KMnNa)<br>(-)', formula: 'K(NaMn)CaNa<sub class="SubSet4">3</sub>AlMn<sub class="SubSet4">13</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">12</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,09' },
              { ime: 'Georgiadesite<br>(-)', formula: 'Pb<sub class="SubSet4">4</sub>(As<sup class="SupSet">3+</sup>O<sub class="SubSet4">3</sub>)Cl<sub class="SubSet4">4</sub>(OH)', postotak: '0,09' },
              { ime: 'Housleyite<br>(-)', formula: 'Pb<sub class="SubSet4">6</sub>CuTe<sub class="SubSet4">4</sub>O<sub class="SubSet4">18</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,09' },
              { ime: 'Hydroxylhedyphane<br>(-)', formula: 'Ca<sub class="SubSet4">2</sub>Pb<sub class="SubSet4">3</sub>(AsO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)', postotak: '0,09' },
              { ime: 'Macaulayite<br>(-)', formula: 'Fe<sup class="SupSet">3+</sup><sub class="SubSet4">24</sub>Si<sub class="SubSet4">4</sub>O<sub class="SubSet4">43</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,09' },
              { ime: 'Macquartite<br>(-)', formula: 'Cu<sub class="SubSet4">2</sub>Pb<sub class="SubSet4">7</sub>(CrO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,09' },
              { ime: 'Tazzoliite<br>(-)', formula: 'Ba<sub class="SubSet4">2</sub>CaSr<sub class="SubSet4">0.5</sub>Na<sub class="SubSet4">0.5</sub>Ti<sub class="SubSet4">2</sub>Nb<sub class="SubSet4">3</sub>SiO<sub class="SubSet4">17</sub>[PO<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>]<sub class="SubSet4">0.5</sub>', postotak: '0,09' },
              { ime: 'Wherryite<br>(-)', formula: 'Pb<sub class="SubSet4">7</sub>Cu<sub class="SubSet4">2</sub>(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">4</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,09' },
              { ime: 'Eglestonite<br>(-)', formula: '([Hg<sup class="SupSet">1+</sup>]<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>OCl<sub class="SubSet4">3</sub>(OH)', postotak: '0,08' },
              { ime: 'Hydroxylpyromorphite<br>(-)', formula: 'Pb<sub class="SubSet4">5</sub>(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">3</sub>(OH)', postotak: '0,08' },
              { ime: 'Jo&euml;lbruggerite<br>(-)', formula: 'Pb<sub class="SubSet4">3</sub>Zn<sub class="SubSet4">3</sub>Sb<sup class="SupSet">5+</sup>As<sub class="SubSet4">2</sub>O<sub class="SubSet4">13</sub>(OH)', postotak: '0,08' },
              { ime: 'Symesite<br>(-)', formula: 'Pb<sub class="SubSet4">10</sub>(SO<sub class="SubSet4">4</sub>)O<sub class="SubSet4">7</sub>Cl<sub class="SubSet4">4</sub> &#183; H<sub class="SubSet4">2</sub>O', postotak: '0,08' },
              { ime: 'Combeite<br>(-)', formula: 'Na<sub class="SubSet4">4.5</sub>Ca<sub class="SubSet4">3.5</sub>Si<sub class="SubSet4">6</sub>O<sub class="SubSet4">17.5</sub>(OH)<sub class="SubSet4">0.5</sub>', postotak: '0,07' },
              { ime: 'Hemihedrite<br>(-)', formula: 'ZnPb<sub class="SubSet4">10</sub>(CrO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,07' },
              { ime: 'Innelite<br>(-)', formula: 'Ba<sub class="SubSet4">4</sub>Ti<sub class="SubSet4">2</sub>Na(NaCa)Ti(Si<sub class="SubSet4">2</sub>O<sub class="SubSet4">7</sub>)<sub class="SubSet4">2</sub>[(SO<sub class="SubSet4">4</sub>)(PO<sub class="SubSet4">4</sub>)]O<sub class="SubSet4">2</sub>[O(OH)]', postotak: '0,07' },
              { ime: 'Iranite<br>(-)', formula: 'CuPb<sub class="SubSet4">10</sub>(CrO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,07' },
              { ime: 'Kadyrelite<br>(-)', formula: '([Hg<sup class="SupSet">1+</sup>]<sub class="SubSet4">2</sub>)<sub class="SubSet4">3</sub>OBr<sub class="SubSet4">3</sub>(OH)', postotak: '0,07' },
              { ime: 'Raygrantite<br>(-)', formula: 'Pb<sub class="SubSet4">10</sub>Zn(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub>(SiO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub>(OH)<sub class="SubSet4">2</sub>', postotak: '0,07' },
              { ime: 'Strontiowhitlockite<br>(-)', formula: 'Sr<sub class="SubSet4">9</sub>◻Mg(PO<sub class="SubSet4">3</sub>OH)(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">6</sub>', postotak: '0,07' },
              { ime: 'Fantappi&egrave;ite<br>(-)', formula: '[Na<sub class="SubSet4">82.5</sub>Ca<sub class="SubSet4">33</sub>K<sub class="SubSet4">16.5</sub>](Si<sub class="SubSet4">99</sub>Al<sub class="SubSet4">99</sub>O<sub class="SubSet4">396</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">33</sub> &#183; 6H<sub class="SubSet4">2</sub>O', postotak: '0,06' },
              { ime: 'Fluorcarmoite-(BaNa)<br>(-)', formula: 'Ba◻Na<sub class="SubSet4">2</sub>Na<sub class="SubSet4">2</sub>◻CaMg<sub class="SubSet4">13</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">11</sub>(PO<sub class="SubSet4">3</sub>OH)F<sub class="SubSet4">2</sub>', postotak: '0,06' },
              { ime: 'Johnsenite-(Ce)<br>(-)', formula: 'Na<sub class="SubSet4">12</sub>Ce<sub class="SubSet4">3</sub>Ca<sub class="SubSet4">6</sub>Mn<sub class="SubSet4">3</sub>Zr<sub class="SubSet4">3</sub>WSi<sub class="SubSet4">25</sub>O<sub class="SubSet4">73</sub>(CO<sub class="SubSet4">3</sub>)(OH)<sub class="SubSet4">2</sub>', postotak: '0,06' },
              { ime: 'Kircherite<br>(-)', formula: '[Na<sub class="SubSet4">5</sub>Ca<sub class="SubSet4">2</sub>K](Si<sub class="SubSet4">6</sub>Al<sub class="SubSet4">6</sub>O<sub class="SubSet4">24</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">2</sub> &#183; 0.33H<sub class="SubSet4">2</sub>O', postotak: '0,06' },
              { ime: 'Fluorarrojadite-(BaFe)<br>(-)', formula: 'Na<sub class="SubSet4">2</sub>CaBaFe<sup class="SupSet">2+</sup>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">13</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">11</sub>(PO<sub class="SubSet4">3</sub>OH)F<sub class="SubSet4">2</sub>', postotak: '0,05' },
              { ime: 'Fluorarrojadite-(BaNa)<br>(-)', formula: 'BaNa<sub class="SubSet4">4</sub>CaFe<sub class="SubSet4">13</sub>Al(PO<sub class="SubSet4">4</sub>)<sub class="SubSet4">11</sub>(PO<sub class="SubSet4">3</sub>OH)F<sub class="SubSet4">2</sub>', postotak: '0,05' },
              { ime: 'Vladkrivovichevite<br>(-)', formula: '[Pb<sub class="SubSet4">32</sub>O<sub class="SubSet4">18</sub>][Pb<sub class="SubSet4">4</sub>Mn<sub class="SubSet4">2</sub>O]Cl<sub class="SubSet4">14</sub>(BO<sub class="SubSet4">3</sub>)<sub class="SubSet4">8</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,05' },
              { ime: 'Davinciite<br>(-)', formula: 'Na<sub class="SubSet4">12</sub>K<sub class="SubSet4">3</sub>Ca<sub class="SubSet4">6</sub>Fe<sup class="SupSet">2+</sup><sub class="SubSet4">3</sub>Zr<sub class="SubSet4">3</sub>(Si<sub class="SubSet4">26</sub>O<sub class="SubSet4">73</sub>OH)Cl<sub class="SubSet4">2</sub>', postotak: '0,03' },
              { ime: 'Sacrofanite<br>(-)', formula: '(Na<sub class="SubSet4">61</sub>K<sub class="SubSet4">19</sub>Ca<sub class="SubSet4">32</sub>)(Si<sub class="SubSet4">84</sub>Al<sub class="SubSet4">84</sub>O<sub class="SubSet4">336</sub>)(SO<sub class="SubSet4">4</sub>)<sub class="SubSet4">26</sub>Cl<sub class="SubSet4">2</sub>F<sub class="SubSet4">6</sub> &#183; 2H<sub class="SubSet4">2</sub>O', postotak: '0,02' },
            
              
              
            
            ],
            sortedProducts: [],
            mineralCount: null,
        }
    },
    methods: {
        
        async fetchAndSortProducts() {
            try {
                const productsCollectionRef = collection(db, 'Elementi', 'Helij', 'Minerali');
                const q = query(productsCollectionRef, orderBy('ime', 'asc'));
                const querySnapshot = await getDocs(q);
                this.sortedProducts = querySnapshot.docs.map(doc => doc.data());
                this.mineralCount = this.sortedProducts.length;
            } catch (error) {
                console.error('Error fetching and sorting products:', error);
            }
        },
    },
    created() {
        this.fetchAndSortProducts();
    }*/
}
</script>
<style scoped>
    .Linija{
        display: flex;
    }
</style>-->
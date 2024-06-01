<template>
  <div>
    <br><br><br><br>
    <div> UBACI </div>
    <button @click="importData">Import Data</button>
    <button @click="importData2">Import Data 2</button>
  </div>
</template>

<script>
import db from "/VueProjekt/src/firebase/init.js";
import { doc, setDoc } from "/VueProjekt/node_modules/firebase/firestore/dist/firestore/index.d.ts";

export default {
  data() {
    return {
      documentId: '',
      data: {
        Vrsta: '',
        ProtonskiBroj: '',
        SimbolVrsta: '',
        Simbol: '',
        Ime: '',
        ImeG: '',
        Relativna: '',
        Neutroni: '',
        Agregatno: '',
        Talište: '',
        Vrelište: '',
        Radioaktivan: '',
        Umjetan: '',
        PunaRelativna: '',
        Poruka: null,
        Paragraf1: null,
        Paragraf2: null,
        Paragraf3: null,
        Paragraf4: null,
        Paragraf5: null,
        Paragraf6: null,
        Paragraf7: null,
        Paragraf8: null,
        Paragraf9: null,
        Paragraf10: null,
        Paragraf11: null,
        Paragraf12: null,
        Paragraf13: null,
        Paragraf14: null,
        Paragraf15: null,
        NPPP: '[Ne]3s<sup>2</sup>3p<sup>2</sup>',
        ObicnaNotacija: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>2</sup>", // Silicij
        SPDF: '',
      },
      collectionName: "Izotop",
      documentId2: "Izotopi",
      data2: {
        Izotop: '<sup class="SupSet2">Broj</sup>Simbol',
        Vrijeme: null,
        VrstaIzotopa: null,
        Produkt: null,
        Priroda: '',
        RadioIzotop: '',

        Izotop2: null,
        Vrijeme2: null,
        VrstaIzotopa2: null,
        Produkt2: null,
        Priroda2: null,
        RadioIzotop2: null,

        Izotop3: null,
        Vrijeme3: null,
        VrstaIzotopa3: null,
        Produkt3: null,
        Priroda3: null,
        RadioIzotop3: null,
        
        Izotop4: null,
        Vrijeme4: null,
        VrstaIzotopa4: null,
        Produkt4: null,
        Priroda4: null,
        RadioIzotop4: null,
        
        Izotop5: null,
        Vrijeme5: null,
        VrstaIzotopa5: null,
        Produkt5: null,
        Priroda5: null,
        RadioIzotop5: null,
      }
    };
  },
  methods: {
    async importData() {
      try {
        const docRef = doc(db, "Elementi", this.documentId);
        await setDoc(docRef, this.data);
        console.log("Data imported successfully");
        alert("Data imported successfully");
      } catch (error) {
        console.error("Error importing data: ", error);
        alert("Error importing data: " + error.message);
      }
    },
    async importData2() {
      try {
        // Correctly reference the nested document path
        const nestedDocRef = doc(db, "Elementi", this.documentId, this.collectionName, this.documentId2);
        console.log(`Path: Elementi/${this.documentId}/${this.collectionName}/${this.documentId2}`);
        await setDoc(nestedDocRef, this.data2);
        console.log("Data imported successfully");
        alert("Data imported successfully");
      } catch (error) {
        console.error("Error importing nested data: ", error);
        alert("Error importing nested data: " + error.message);
      }
    }
  }
};
/*

return {
      documentId: '',
      data: {
        Vrsta: '',
        ProtonskiBroj: '',
        SimbolVrsta: '',
        Simbol: '',
        Ime: '',
        ImeG: '',
        Relativna: '',
        Neutroni: '',
        Agregatno: '',
        Talište: '',
        Vrelište: '',
        Radioaktivan: '',
        Umjetan: '',
        PunaRelativna: '',
        Poruka: null,
        Paragraf1: null,
        Paragraf2: null,
        Paragraf3: null,
        Paragraf4: null,
        Paragraf5: null,
        Paragraf6: null,
        Paragraf7: null,
        Paragraf8: null,
        Paragraf9: null,
        Paragraf10: null,
        Paragraf11: null,
        Paragraf12: null,
        Paragraf13: null,
        Paragraf14: null,
        Paragraf15: null,
        NPPP: '[Ne]3s<sup>2</sup>3p<sup>2</sup>',
        ObicnaNotacija: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>2</sup>", // Silicij
        SPDF: '',
      },
      collectionName: "Izotop",
      documentId2: "Izotopi",
      data2: {
        Izotop: "<sup class="SupSet2">Broj</sup>Simbol",
        Vrijeme: null,
        VrstaIzotopa: null,
        Produkt: null,
        Priroda: "",
        RadioIzotop: "",

        Izotop2: null,
        Vrijeme2: null,
        VrstaIzotopa2: null,
        Produkt2: null,
        Priroda2: null,
        RadioIzotop2: null,

        Izotop3: null,
        Vrijeme3: null,
        VrstaIzotopa3: null,
        Produkt3: null,
        Priroda3: null,
        RadioIzotop3: null,
        
        Izotop4: null,
        Vrijeme4: null,
        VrstaIzotopa4: null,
        Produkt4: null,
        Priroda4: null,
        RadioIzotop4: null,
        
        Izotop5: null,
        Vrijeme5: null,
        VrstaIzotopa5: null,
        Produkt5: null,
        Priroda5: null,
        RadioIzotop5: null,
      }
    };

*/
</script>

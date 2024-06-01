<template>
    <div>
    <br><br><br><br>
    <div> UBACI MINERALE </div>
    <button @click="importData">Import Minerali</button>
    <button @click="importData2">Import Minerali slike</button>
    <button @click="importData3">Import Elementi detalji</button>
    <button @click="importData4">Import Elementi detaljiparametara</button>
  </div>
</template>
<script>
import db from "/VueProjekt/src/firebase/init.js";
import { doc, setDoc } from "/VueProjekt/node_modules/firebase/firestore/dist/firestore/index.d.ts";

export default {
  data() {
    return {
      documentId: 'Tirkiz',
      data: {
        Ime: 'Tirkiz',
        ImeG: 'tirkiza',
        Tekst: '<div class="NaslovOCemu">O tirkizu</div><div class="Tekstic"> Tirkiz je fosfat hidrat bakra i aluminija ( CuAl<sub class="SubSet">6</sub>(PO<sub class="SubSet">4</sub>)<sub class="SubSet">4</sub>(OH)<sub class="SubSet">8</sub> &#183; 4H<sub class="SubSet">2</sub>O ) zbog čega pripada u grupu fosfata. Ime potječe od francuske riječi „turques“, što znači „turski kamen“, jer su ga turski prodavači donijeli u Europu. Formira se u oksidacijskim zonama bakrene rude kao masivan ili mikrokristalični agregat, kao inkrustacija ili nodul ili u venama. Nastaje djelovanjem kiselih vodenih otopina tijekom raspada i oksidacije već postojećih minerala. Bakar iz halkopirita, azurita, malahita (iz glinice), a fosfor iz apatita. Kristali su vrlo rijetki, kratki su, u obliku prizme i prozirni. Koristi se u nakitu i kao atraktivan izložbeni primjerak. Boja minerala varira, ovisno o količini primjesa bakra i željeza u mineralu. Na tržištu se falsificira bojanjem howlita, a teško je spoznati razliku. Howlit je mekši od tirkiza pa ga nokat može ogrebati.  <br> <br> Važniji izvori tirkiza su: Madan, Iran; Ottre, Belgija; rudnik Bunny, Cornwall, UK; Katonto, Kongo; rudnik željeza Itatiaiucu, Brazil; u SAD-u: rudnik Bishop, Virginia; Cerrillos, Novi Meksiko; Mineral Park, Arizona. <br> <br> <span class="upozorenje">Udisanje čestica tijekom rezanja ili brušenja tirkiza može biti po život opasno!</span> <br> <span class="upozorenje">S primjercima rukovati oprezno i obavezno oprati ruke!</span></div>',
        Boja: 'svijetlo plava do blijedo zelena',
        Prozirnost: 'proziran, poluproziran, neproziran',
        Sjaj: 'tupi do voštani, sub-staklasti',
        Ogreb: 'blijedo plavo zeleni, bijeli',
        Tvrdoća: '5 - 6',
        Čvrstoća: 'krhki',
        Kalavost: 'savršena',
        Lom: 'neravan, sub-konhoidalan',
        Specifična: '2,6 - 2,8',
        KomentarSpecifična: null,
        Formula: '<span class="Bakar text">Cu</span><span class="Aluminij text">Al</span><sub class="SubSet2">6</sub>(<span class="Fosfor text">P</span><span class="Kisik text">O</span><sub class="SubSet2">4</sub>)<sub class="SubSet2">4</sub>(<span class="Kisik text">O</span><span class="Vodik text">H</span>)<sub class="SubSet2">8</sub> &#183; 4<span class="Vodik text">H</span><sub class="SubSet2">2</sub><span class="Kisik text">O</span>',
        Grupa: 'fosfati',
        Grupacija: 'tirkizova grupa',
        Sustav: 'triklinski',
        Klasa: '1 - pinakoidna',
        Volumen: '449,39',
        Omjer: '0,97 : 1 : 1,298',
        Z: '1',
      },
      collectionName: "Slike",
      documentId2: "Slike",
      data2: {
        Nalaziste1: '',
        Nalaziste2: '',
        Nalaziste3: '',
        Nalaziste4: '',
        URL1: '/Slike/Tirkiz.jpg',
        URL2: '',
        URL3: '',
        URL4: '',
        Opis1: 'Tirkiz',
        Opis2: '',
        Opis3: '',
        Opis4: '',
      },

      collectionName3: "Elementi",
      documentId3: "Detalji",
      data3: {
        Ele1: 'Kisik',
        Ele2: 'Aluminij',
        Ele3: 'Fosfor',
        Ele4: 'Bakar',
        Ele5: 'Vodik',
        Ele6: '',
        Ele7: '',
        Ele8: '',
        Ele9: '',
        Ele10: '',

        Posto1: '55,08',
        Posto2: '19,89',
        Posto3: '15,23',
        Posto4: '7,81',
        Posto5: '1,98',
        Posto6: '',
        Posto7: '',
        Posto8: '',
        Posto9: '',
        Posto10: '',

        Simbol1: 'O',
        Simbol2: 'Al',
        Simbol3: 'P',
        Simbol4: 'Cu',
        Simbol5: 'H',
        Simbol6: '',
        Simbol7: '',
        Simbol8: '',
        Simbol9: '',
        Simbol10: '',
      },

      collectionName4: "Elementi",
      documentId4: "DetaljiParametara",
      data4: {
        Naziv1: 'a',
        Naziv2: 'b',
        Naziv3: 'c',
        Naziv4: '&alpha;',
        Naziv5: '&beta;',
        Naziv6: '&gamma;',
        Naziv7: '',
        Naziv8: '',

        Vrijednost1: '7,409 Å',
        Vrijednost2: '7,635 Å',
        Vrijednost3: '9,914 Å',
        Vrijednost4: "111°21'14''",
        Vrijednost5: "114°58'23''",
        Vrijednost6: "69°31'55''",
        Vrijednost7: '',
        Vrijednost8: '',
      }
    };
  },
/* 

documentId: '',
      data: {
        Ime: '',
        ImeG: '',
        Tekst: '',
        Boja: '',
        Prozirnost: '',
        Sjaj: '',
        Ogreb: '',
        Tvrdoća: '',
        Čvrstoća: '',
        Kalavost: '',
        Lom: '',
        Specifična: '',
        KomentarSpecifična: null,
        Formula: '',
        Grupa: '',
        Grupacija: '',
        Sustav: '',
        Klasa: '',
        Volumen: '',
        Omjer: '',
        Z: '',
      },
      collectionName: "Slike",
      documentId2: "Slike",
      data2: {
        Nalaziste1: '',
        Nalaziste2: '',
        Nalaziste3: '',
        Nalaziste4: '',
        URL1: '',
        URL2: '',
        URL3: '',
        URL4: '',
        Opis1: '',
        Opis2: '',
        Opis3: '',
        Opis4: '',
      },

      collectionName3: "Elementi",
      documentId3: "Detalji",
      data3: {
        Ele1: '',
        Ele2: '',
        Ele3: '',
        Ele4: '',
        Ele5: '',
        Ele6: '',
        Ele7: '',
        Ele8: '',
        Ele9: '',
        Ele10: '',

        Posto1: '',
        Posto2: '',
        Posto3: '',
        Posto4: '',
        Posto5: '',
        Posto6: '',
        Posto7: '',
        Posto8: '',
        Posto9: '',
        Posto10: '',

        Simbol1: '',
        Simbol2: '',
        Simbol3: '',
        Simbol4: '',
        Simbol5: '',
        Simbol6: '',
        Simbol7: '',
        Simbol8: '',
        Simbol9: '',
        Simbol10: '',
      },

      collectionName4: "Elementi",
      documentId4: "DetaljiParametara",
      data4: {
        Naziv1: '',
        Naziv2: '',
        Naziv3: '',
        Naziv4: '',
        Naziv5: '',
        Naziv6: '',
        Naziv7: '',
        Naziv8: '',

        Vrijednost1: '',
        Vrijednost2: '',
        Vrijednost3: '',
        Vrijednost4: '',
        Vrijednost5: '',
        Vrijednost6: '',
        Vrijednost7: '',
        Vrijednost8: '',
      }

*/
  methods: {
    async importData() {
      try {
        const docRef = doc(db, 'Minerali', this.documentId);
        await setDoc(docRef, this.data);
        alert("Data imported successfully");
      } catch (error) {
        alert("Error importing data: " + error.message);
      }
    },
    async importData2() {
      try {
        const nestedDocRef = doc(db, "Minerali", this.documentId, this.collectionName, this.documentId2);
        await setDoc(nestedDocRef, this.data2);
        alert("Data imported successfully");
      } catch (error) {
        console.error("Error importing nested data: ", error);
        alert("Error importing nested data: " + error.message);
      }
    },
    async importData3() {
      try {
        const nestedDocRef = doc(db, "Minerali", this.documentId, 'Elementi', 'Detalji');
        await setDoc(nestedDocRef, this.data3);
        alert("Data imported successfully");
      } catch (error) {
        console.error("Error importing nested data: ", error);
        alert("Error importing nested data: " + error.message);
      }
    },
    async importData4() {
      try {
        const nestedDocRef = doc(db, "Minerali", this.documentId, 'Elementi', 'DetaljiParametara');
        await setDoc(nestedDocRef, this.data4);
        alert("Data imported successfully");
      } catch (error) {
        console.error("Error importing nested data: ", error);
        alert("Error importing nested data: " + error.message);
      }
    }
  }
};
</script>

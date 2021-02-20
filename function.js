 //Bu fonksiyonumuz uygulamamizin ana ekrani olan isim listesini UI`a yazdiran fonksiyonumuz
 function renderPersonList() {
     setLocal()
     let table = `<table class=""table table-list-search>`;
     table += `<thead>`;
     table += `<tr>
                        <th class="fName">Adı</th>
                        <th class="lName">Puan</th>
                       
                      </tr>`;
     table += `</thead>`;
     personList.map((item, i) => {
         table += `<tr>
                           <td  id="${item.name.toLocaleLowerCase()+i}">${item.name}</td>
                           <td >${item.point}</td>
                           
                        </tr>`;
     }).join('');
     table += `<table>`;
     addToDom(table);
     selectPerson()
 }

 //Bu iki fonksiyonumuz Local Storage`i güncel tutan ve storage dan bilgi ceken fonksiyonlarimiz 
 function addLocal(ppersonList) {
     localStorage.setItem("person", JSON.stringify(ppersonList))
 }

 function setLocal() {
     personList = JSON.parse(localStorage.getItem("person"))
 }

 //Bu fonksiyonumuz giren kullanicimizin sira numarasina gore aldigi puani guncelleyen fonksiyonumuz
 function saveScore(pordernumber) {
     personList[pordernumber].point = score
     addLocal(personList)

 }
 //Bu fonksiyonumuz kullanicinin cevaplarini kontrol edip ona gore skor olusturan fonksiyonumuz
 function answerControl(panswer, oanswer) {
     if (panswer[sayac] == oanswer[sayac]) {
         score++;
     }
 }

 //Carpma islemini yapan fonksiyonumuz
 function Multiplication(prandomNumberone, prandomNumbertwo) {
     let manswer = prandomNumberone * prandomNumbertwo
     return manswer
 }



 /**
  * Bu kisimda programimizi soru sinirina gelince veya sure dolunca aldiginiz puani size gosteren ve ana listemize donduren kisim
  */

 //Reload fonksiyonumuz
 function reload() {
     window.location.reload()
 }
 //Alert fonksiyonumuz
 function alertScore(pscore) {
     alert(`Tebrikler Puaniniz : ${pscore}`)
 }

 //Bu fonksiyonumuz ise sayac fonksiyonumuz soru sayimiz 10 a ulasinca uygulamamizi ana menumuze donduren fonksiyon
 function printCounter(pordernumber) {
     sayac++;
     if (sayac == 10) {
         saveScore(pordernumber)
         alertScore(score)
         reload()
         sayac = 0;

     }
 }

 //Bu fonksiyonumuz ise sorularimizin cevaplarini arraye push eden fonksiyonumuz
 function pushtoArray(pArray, pcevap) {
     pArray.push(pcevap)
 }
 //Sorularimizi olusturan fonksiyonumuz
 function createQuestion() {
     let randomNumberone = (Math.floor(Math.random() * 10) + 1)
     let randomNumbertwo = (Math.floor(Math.random() * 10) + 1)
     let question = randomNumberone + "*" + randomNumbertwo
     pushtoArray(answerArray, Multiplication(randomNumberone, randomNumbertwo))
     printQuestiontoHtml(question)
 }
 //Full Screen modunda calistirmak icin yazilmis fonksiyonumuz
 function toggleFullScreen() {
     if (!document.fullscreenElement) {
         document.documentElement.requestFullscreen();
     } else {
         if (document.exitFullscreen) {
             document.exitFullscreen();
         }
     }
 }

 document.addEventListener("keypress", function (e) {
     if (e.keyCode === 13) {
         toggleFullScreen();
     }
 }, false);
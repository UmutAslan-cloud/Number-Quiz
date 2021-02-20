//Ana listemizi render eden fonksiyonumuz
function rendering() {

    document.querySelector("question").innerHTML = `<table class="table table-list-search">
                     </table>
    <input id="add-person-input" type="text" >
    <button id="add-person-button" type="button" class="btn btn-secondary">Add Person</button>
`
    addPerson();
}
//Kisi eklemek icin olusturaln butonumuza event ekledigimiz fonksiyonumuz
function addPerson() {
    let addButton = document.querySelector("#add-person-button")
    let inputBox = document.querySelector("#add-person-input")
    addButton.addEventListener("click", function () {
        personList.push({
            "name": inputBox.value,
            "point": 0
        })
        addLocal(personList)
        renderPersonList()
    })
}
//Verilen parametreyi dom un icindeki table a yazdiran fonksiyonumuz
function addToDom(template) {
    document.querySelector('.table-list-search').innerHTML = template;
}
//Secilen isim dogrultusunda o isim icin quizi baslatan fonksiyonumuz
function selectPerson() {
    let select = personList.map(function (person, i) {
        let clickedbt = document.querySelector(`#${person.name.toLocaleLowerCase()+i}`)
        clickedbt.addEventListener("click", function (e) {
            document.querySelector("question").innerHTML = renderQuestionField(i)
            document.querySelector("#button-field").style.visibility = "hidden";
            document.querySelector("#input-field").style.visibility = "hidden";
            nextQuestion(i)
            startQuiz()
        })
    })

}
//gorunusu degistrmek icin yazikmis fonksiyonumuz
function visibility() {
    document.querySelector("#button-field").style.visibility = "visible";
    document.querySelector("#input-field").style.visibility = "visible";
}
//Bir sonraki sorumuza gecen fonksiyonum
function nextQuestion(i) {
    document.getElementById("button-field").addEventListener("click", function () {

        personAnswer()
        createQuestion()
        printCounter(i)
        answerControl(personAnswerArray, answerArray)





    })
}

//Kullanicinin cevaplarini yazdiran fonksiyonumuz
function personAnswer() {
    let personAnswerValue = document.querySelector("#input-field").value
    pushtoArray(personAnswerArray, Number(personAnswerValue))
    console.log(personAnswerArray)
    return personAnswerValue

}
//Sinavi baslatan fonksiyonumuz
function startQuiz() {
    document.querySelector("#question-field").addEventListener("click", () => {
        counterSeconds()
        createQuestion()
        visibility()
        setTime()

    })
}


//Soruyu yazdiran fonksiyonumuz
function printQuestiontoHtml(pquestion) {
    document.querySelector("#question-field").innerHTML = `${pquestion}`
}

//Sureyi ekrana yazdiran fonksiyonumuz
let seconds = 100;

function counterSeconds() {
    let el = document.querySelector("p");

    function incrementSeconds() {
        seconds--;
        el.innerHTML = `${seconds} saniyeniz kaldi`;
    }
    setInterval(incrementSeconds, 1000);
}

//Sure bittiginde sinavi sonlandiran fonksiyonumuz
function setTime() {
    setTimeout(() => {

        reload()

    }, 100000);
}


//Soru sayfamizin html ini olusturan kisim
function renderQuestionField(i) {

    return `<div>
    <p>Hosgeldiniz ${personList[i].name}</p>
   <span id="question-field"><button type="button" class="btn btn-secondary" >Testi Baslat</button></span>
   <input type="text" placeholder="Cevap" id="input-field" onChange="this.value=''">
   <button id="button-field" type="button" class="btn btn-secondary">Cevapla</button>
   </div>`
}
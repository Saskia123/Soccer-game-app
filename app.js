var app = new Vue({
    el: '#vue-data',
    data: {
        schedule: [],
        teams: [],
        locations: []
    },
    created() {
        fetch('https://api.myjson.com/bins/1fwd7o')
            .then(response => response.json())
            .then(json => {
                this.schedule = json.schedule
            console.log(json.schedule);
                this.teams = json.teams
                this.locations = json.locations
            })
    }
})

//$(document).ready(function () {
//    $("#myInput").on("keyup", function () {
//        var value = $(this).val().toLowerCase();
// 
//        var booksinHtml = document.getElementsByClassName("search")
//        for (var i = 0; i < booksinHtml.length;i++) {
//            var book = booksinHtml[i];
//            if (book.innerHTML.toLowerCase().indexOf(value) != -1) {
//                $(book.parentNode.parentNode).show()
//            } else {
//                $(book.parentNode.parentNode).hide()
//            }
//        }
//    });
//});



//var app = new Vue({
//    el: '.maincontainer',
//    data: {
//        list: [],
//        arrayOfCities: []
//    },
//    created() {
//        fetch('https://api.myjson.com/bins/1fwd7o')
//            .then(response => response.json())
//            .then(json => {
//                this.list = json.list
//                console.log(json.list);
//            })
//    },
//    methods: {
//        showCities: function (weathertype) {
//            //switch (weathertype){
//            //    case "sunny": "clear sky"
//            //        break;
//            //}
//            for (var i = 0; i < this.list.length; i++) {
//            if (weathertype === "Thunderstorm"){
//            var main = this.list[i].weather[0].main
//                if (main === weathertype) {
//                    this.arrayOfCities.push(this.list[i].name);
//                } else {
//                }
//            }
//            if (weathertype === "clouds"){
//                var clouds = this.list[i].weather[0].clouds
//                if (clouds !== 0) {
//                    this.arrayOfCities.push(this.list[i].name);
//                } else {
//                }                
//            }
//            if (weathertype === "snow"){
//                 var snow = this.list[i].weather[0].snow
//                 console.log(snow);
//                if (snow !== null) {
//                    this.arrayOfCities.push(this.list[i].name);
//                } else {
//                }               
//            }
//            if (weathertype === "clear sky"){
//                var description = this.list[i].weather[0].description
//                if (description === weathertype) {
//                    this.arrayOfCities.push(this.list[i].name);
//                } else {
//                }
//            }
//            if (weathertype === "rain"){
//                 var rain = this.list[i].weather[0].rain
//                if (rain !== null) {
//                    this.arrayOfCities.push(this.list[i].name);
//                } else {
//                }               
//            }
//            }
//            console.log(this.arrayOfCities)
//        }
//    }
//})
//

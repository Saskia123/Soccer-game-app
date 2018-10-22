var app = new Vue({
    el: '#vue',
    data: {
        selected: "teams",
        teamfilter: "all",
        locationfilter: "all",
        schedule: [],
        allTeamsSchedule: [],
        teams: [],
        locations: [],
        pageLocation: 'teams',
    },
    created() {
        fetch('https://api.myjson.com/bins/100l3w')
            .then(response => response.json())
            .then(json => {
                console.log(json)
                app.allTeamsSchedule = json.schedule;
                app.schedule = app.allTeamsSchedule;
                console.log(json.schedule);
                app.teams = json.teams
                app.locations = json.locations
            })
    },
    methods: {
        getTeamName: function(id) {
            for (let i = 0; this.teams.length; i++) {
                if (this.teams[i].id == id) {
                    return this.teams[i].name;
                }
            }
        },
        getTeamShield: function(id) {
            for (let i = 0; this.teams.length; i++) {
                if (this.teams[i].id == id) {
                    return this.teams[i].shield;
                }
            }
        },
        getOneTeamSchedule: function (id) {

        },
        goToSchedule: function () {
            this.pageLocation = 'schedule';
        },
        goToTeams: function () {
            this.pageLocation = 'teams';
        }
        //toggle the bool to set display

        //		toggleDisplay: function(bttn){
        //            
        //			this.bttn = !this.bttn;
        //            console.log(this.toggleTeams)
        //		}
    }
})


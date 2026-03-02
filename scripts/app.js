const App = {
    state: {
        appointments: [],
        editIndex: null,
        reports:[]
    },
    init() {
        console.log("App initialized");
        this.cacheDOM();
        this.bindEvents();
    }
};

App.init();


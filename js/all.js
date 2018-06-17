var app = new Vue({
    el: '#app',
    data: {
        data: [],
        filter: '',
        free: false,
        allDay: false,
    },
    methods: {
        getData() {
            const vm = this;
            const api = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97&limit=300&q=';
            $.get(api).then(function (response) {
                vm.data = response.result.records;
                // console.log(response.result.records)
            });
        },
    },
    created() {
        this.getData();

    },
    computed: {
        filteredZone: function () {
            const vm = this;
            let zoneData = [];
            vm.data.forEach(function (item) {
                zoneData.push(item.Zone);
            });
            let result = zoneData.filter(function (element, index, arr) {
                return arr.indexOf(element) === index;
            });
            return result;
        },
        filteredData: function () {
            const vm = this;
            let fData = [];
            let freeData = [];
            let allDayData = [];
            if (vm.filter === '') {
                // return vm.data;
                vm.data.forEach(function (item) {
                    fData.push(item);
                })
            } else {
                vm.data.forEach(function (item) {
                    if (vm.filter === item.Zone) {
                        fData.push(item);
                    }
                })
            }
            if (vm.free) {
                console.log(vm.free);
                // console.log(fData);
                fData.forEach(function (item) {
                    console.log(item.Ticketinfo);
                    if (item.Ticketinfo === "免費參觀") {
                        freeData.push(item);
                    }
                });
                // return freeData;
            } else {
                fData.forEach(function (item) {
                    freeData.push(item);
                })
                // return fData;
            }
            
            if (vm.allDay) {
                freeData.forEach(function (item) {
                    console.log(item.Ticketinfo);
                    if (item.Opentime === "全天候開放") {
                        allDayData.push(item);
                    }
                });
                return allDayData;
            } else {
                freeData.forEach(function (item) {
                    allDayData.push(item);
                })
                // return fData;
            }
            // console.log(vm.free);
            return allDayData;
        },

    },
    filters: {
        cashFilters: function (value) {
            if (value == '') {
                return '無相關資訊'
            } else {
                return value;
            }
        }
    }
})
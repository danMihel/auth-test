axios
.get("https://host1.medsafe.tech:40443/api/client_login", {
  params: {
    json: {
      login: this.login,
      password: this.password,
      IMEI: this.$store.state.IMEI,
      Name_app: "connect",
    },
  },
})
.then((res) => {
  this.$store.commit("setIdLogin", res.data[0].id_login),
    this.$store.commit("setTK", res.data[0].TK),
    console.log(res.data[0], "1");
  axios
    .get("https://host1.medsafe.tech:40443/api/test", {
      params: {
        json: {
          id_login: this.$store.state.id_login,
          id_people: this.$store.state.id_login,
          TK: this.$store.state.TK,
          IMEI: this.$store.state.IMEI,
          Name_app: "connect",
          Name_event: "list_load",
        },
      },
    })
    .then((res) => { 
     this.$store.commit("setUserData", res.data.body),
      console.log(this.$store.state.userData[0].doc_type);
      axios
        .get("https://host1.medsafe.tech:40443/api/test", {
          responseType: "json",
          params: {
            json: {
              id_login: this.$store.state.id_login,
              id_people: this.$store.state.id_login,
              TK: this.$store.state.TK,
              IMEI: this.$store.state.IMEI,
              Name_app: "connect",
              Name_event: "get_pic_path",
              id_document: this.$store.state.userData[2].id_document,
              doc_type: this.$store.state.userData[2].doc_type,
            },
          },
        })
        .then((res) => {
          console.log(res.data.body[0].hash);
        });
    });
})
.catch((error) => {
  console.log(error);
})
.finally(() => {
  this.isLoade = true;
});

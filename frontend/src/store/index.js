import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js"

Vue.use(Vuex);

// import axios2 from "axios"
import axios from "../lib/axios-common.js"

export default new Vuex.Store({
  state: {
    userInfo: null,
    isLogin: false,
    // isLogin: true,
    isLoginError: false,
    myPostList: null, //내가 쓴 포스트 목록
    myDetailTitle: "", //상세보기 제목
    myDetail: "", //상세보기 내용
    commentList: [],
    nickname: "", //글쓴이
    pid: null, //글 번호
  },
  //state 값 변화
  mutations: {
    // 로그인이 성공했을 때
      loginSuccess(state, payload){
        console.log("login success!")
        state.isLogin = true;
        state.isLoginError = false;
        state.userInfo = payload;
        console.log("userInfo : ", state.userInfo)
        router.push({ name: "home"})
      },
    // 로그인이 실패했을 때
      loginError(state){
        console.log("login error!")
        state.isLoginError = true;
        state.isLogin = false;
      },
      logout(state){
        state.isLogin = false;
        state.isLoginError = false;
        state.userInfo = null;
      },
      getMyPostList(state, payload){
        state.myPostList = payload.myPostList;
        //console.log(payload.myPostList);
        //console.log("state : ",state.myPostList);
        //state.myPostList = JSON.parse(localStorage.getItem('myPostList'));
        //console.log("myPostList: ",state.myPostList);
        //router.push({name: "mypage"});
      },
      getCommentList(state, payload){
        state.commentList = payload.commentList;
      },
      showMyDetail(state,payload){
        state.myDetail = payload.myDetail.content;
        state.myDetailTitle = payload.myDetail.title;
        state.nickname = payload.myDetail.nickname;
        state.pid = payload.myDetail.pid;
        console.log("state_mayDetail :"+state.myDetail);
        console.log("payload_mayDetail :"+payload.myDetail);
        router.push({name: "readPost"});
      },
      goEditDetail(state,payload){
        state.myDetail = payload.myDetail.content;
        state.myDetailTitle = payload.myDetail.title;
        state.nickname = payload.myDetail.nickname;
        state.pid = payload.myDetail.pid;
        router.push({name: "editPost"});
      }
      
  },
  //비즈니스 로직
  actions: {
    // 로그인 시도
    login({dispatch}, loginObj){
      // 로그인 > 유효한 멤버인지 확인하고 토큰 반환
      axios
        .post('/v1/signin?email='+loginObj.id+"&password="+loginObj.password) //파라메터(body)
        .then( res => {
          // 성공 시 token을 받아옴 (실제로는 user_id 값을 받아옴 / 토큰에 user_id를 암호화해서)
          // 이 토큰을 헤더에 포함시켜서 유저 정보을 요청
          
          //config에서 헤더 값을 설정해 줄 수 있고, 헤더 내에 토큰 값을 넣어주려고 하기 때문에 config 쓰는것.
          let token = res.data.data
          //토큰을 로컬스토리지에 저장
          localStorage.setItem("access_token", token) //key, value
          dispatch('getMemberInfo')
        })
        .catch( err => {
            console.log(err)
            // if(loginObj.id !== '' && loginObj.password !== ''){
              alert('이메일과 비밀번호를 확인하세요')
            // }
        });
    },
    logout({commit}){
      var result = confirm("로그아웃 하시겠어요?")
      if(result){
        commit('logout')
        console.log("로그아웃 합니다!")
        localStorage.removeItem("access_token")
        router.push({ name: "home"})
      } else {
        // commit('login')
      }
    },

    signinWithKakao({dispatch}) {
      console.log("signinWithKakao")
      window.Kakao.Auth.login({
        success: function(authObj){
          axios
          .post("/v1/signin/kakao?accessToken="+authObj.access_token)
          .then(response =>{
            console.log(response.data);
            let token = response.data.data
            localStorage.setItem("access_token", token) //key, value
            dispatch('getMemberInfo')
          })
          .catch(err => {
            if(err.response){
              console.log("err.response.data", err.response.data);
              // if(err.response.data.code === -1000){
              //   console.log("token 값 확인 : ", authObj.access_token);
              //   dispatch('signupWithKakao', authObj)
              // } 
              // console.log("status", err.reaponse.status);
              // console.log("headers", err.reaponse.headers);
            } else if(err.request){
              console.log("error!!!",err.request);
            } else{
              console.log('Error', err.message);
            }
            console.log("err.config",err.config);
          })
        },
        fail: function(err){
          alert("fail",JSON.stringify(err))
          console.log("err : ",err)
        }
      })
    }, 
    // signupWithKakao({commit}, authObj) {
    //   console.log("signupWithKakao")
    //   commit
    //   console.log(authObj)
    //   axios
    //     .post("/v1/signup/kakao?accessToken="+authObj.access_token)
    //     .then(response => {
    //       console.log("response.data", response.data);
    //       commit
    //       alert("회원가입에 성공했습니다.!")
    //       router.push({name: "home"})
    //     })
    //     .catch(err => {
    //       if(err.response){
    //         console.log("err.response.data", err.response.data);
            
    //       } else if(err.request){
    //         console.log("err.request",err.request);
    //       } else{
    //         console.log('err.message', err.message);
    //       }
    //       console.log('err.config', err.config);
    //     })
    // },

    // signinWithFacebook({dispatch}, authObj){
    //   console.log("signinWithFacebook")
    //   dispatch
    //   console.log(authObj)
    //   axios
    //   .get("/social/fb")
    //   .then(response => {
    //       console.log(response.data);
    //       let loginUrl = response.data.loginUrl;
    //       window.open("http://i3a606.p.ssafy.io:8090/oauth2/authorization/"+authObj.provider,
    //             authObj.provider+" 로그인",
    //             "width=450, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes" ); 
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     alert('facebook 로그인 실패!')
    //   })
    // },

    signinWithSocial({dispatch}, authObj){
      console.log("signinWithSocial")
      dispatch
      console.log("authObj 값 확인 : ", authObj)

      // axios
      //   .get("/social/login/"+authObj.provider+"?code="+authCode)
      //   .then(response => {
      //       // let userInfo = {
      //       //   id: response.data.data.id,
      //       //   email: response.data.data.email,
      //       //   name: response.data.data.name,
      //       //   nickname: response.data.data.nickname,
      //       //   picture: response.data.data.picture
      //       // }
      //       // commit('loginSuccess', userInfo)
            
      //       //없는 사용자면 signup 해야함.!!
      //       console.log(response)
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })

      axios
          .post("/v1/signin/"+authObj.provider+"?accessToken="+authObj.access_token)
          .then(response =>{
            console.log(response.data);
            let token = response.data.data
            localStorage.setItem("access_token", token) //key, value
            dispatch('getMemberInfo')
          })
          .catch(err => {
            if(err.response){
              console.log("err.response.data", err.response.data);
            } else if(err.request){
              console.log("error!!!",err.request);
            } else{
              console.log('Error', err.message);
            }
            console.log("err.config",err.config);
          })
    },

    signupWithSocial({commit}, authObj){
      console.log("signinWithSocial - "+authObj.provider)
      axios
        .post("/v1/signup/"+authObj.provider+"?accessToken="+authObj.access_token)
        .then(response => {
          console.log("response.data", response.data);
          commit
          alert("회원가입에 성공했습니다.!")
          router.push({name: "home"})
        })
        .catch(err => {
          if(err.response){
            console.log("err.response.data", err.response.data);
            
          } else if(err.request){
            console.log("err.request",err.request);
          } else{
            console.log('err.message', err.message);
          }
          console.log('err.config', err.config);
        })
    },

    getMemberInfo({commit}) {
      //로컬 스토리지에 저장되어있는 토큰을 불러온다.
      let token = localStorage.getItem("access_token");
      if(token !== null){
        let config = {  
          headers: {
            "Accept": "*/*",
            "X-AUTH-TOKEN": token
          }
        }
        //반환된 토큰을 가지고 유저정보를 반환
        //새로고침을 하면 state 날라감 -> 토큰만 가지고 멤버정보 요청 가능 : localStorage에 토큰 저장
        axios //config : 보안과 관련된 헤더나 옵션 등을 설정해줄 수 있는 파일
          .get("/v1/user?lang=ko", config)
          .then(response => {
              let userInfo = {
                id: response.data.data.id,
                email: response.data.data.email,
                name: response.data.data.name,
                nickname: response.data.data.nickname,
                picture: response.data.data.picture
              }
              commit('loginSuccess', userInfo)
          })
          .catch(error => {
            console.log("화면 열면 나는 에러!!!", error)
            // alert('이메일과 비밀번호를 확인하세요1111')
          })
      }
    },

    deleteUserInfo({commit}, userInfo){
      console.log("userInfo 값 확인 : ", userInfo)

      var result = confirm("정말 탈퇴하시겠어요?")
      if(result){
        console.log("탈퇴합니다!")
        
        axios 
        .delete("/v1/user/"+userInfo.id)
        .then(response =>{
          console.log(response.data)
          localStorage.removeItem("access_token")
          commit('logout')
          router.push({name: "home"})
        }).catch( exp =>
          console.log("회원 탈퇴 실패! ", exp)
        );
      } 
    },

    getMyPostList({commit}){//내가 쓴 포스트 리스트 받아옴
      console.log("getMyPostList");
      axios
          .get("/v1/post/all") //일단은 전체 리스트받아오는 걸로
          .then(response =>{
            commit("getMyPostList",{myPostList : response.data})
          }).catch(
            exp => alert("내 글 리스트 불러오기 실패 "+exp)
          );
      
      //localStorage로 테스트
      // let myPostList = [{title: "test", content: "#test"},{title: "test2", content: "#test2"}];
      // localStorage.setItem('myPostList',JSON.stringify(myPostList));
      // commit('getMyPostList');
    },
    getCommentList({commit}, pid) { // 하나의 포스트에 대한 모든 댓글 받아옴
      console.log("getCommentList");
      axios
        .get("/v1/comment/" + pid)
        .then(response => {
          console.log(response.data)
          commit("getCommentList", { commentList: response.data })

        })
        .catch(
          exp => alert("전체 댓글 가져오기 실패" + exp)
        );
    },
    showMyDetail({commit}, pid){//내 글 상세보기
      console.log("showMyDetail_pid:"+pid);
      
      axios
          .get("/v1/post/" + pid) //일단은 전체 리스트받아오는 걸로
          .then(response =>{
            console.dir(response.data);
            commit("showMyDetail",{myDetail : response.data})
          }).catch(
            exp => alert("내 글 상세보기 실패 "+exp)
          );
    },
    goEditDetail({commit},pid) {
      console.log("editDetail_pid:"+pid);
      axios
      .get("/v1/post/" + pid) //일단은 전체 리스트받아오는 걸로
      .then(response =>{
        commit("goEditDetail",{myDetail : response.data})
      }).catch(
        exp => alert("내 에디터로 이동 실패 "+exp)
      );
      commit
    },
    deleteDetail({commit}, pid) {
      console.log("deleteDetail")
      console.log(pid)
      axios
        .delete("/v1/post/" + pid)
        .then(response => {
          console.log(response)
          this.dispatch("getMyPostList")
          router.push({name: "mypage"})
        })
        .catch(
          exp => alert("내 글 삭제 실패 " + exp)
        );
        commit
    },
    
  }
});
import { createStore } from "vuex";

const store = createStore({
  state: () => {
    return {
      questionList: [
        {
          id: "q1",
          title: "问卷1",
          isPublished: false,
          isStar: false,
          answerCount: 5,
          createdAt: "3月10日 13:23",
        },
        {
          id: "q2",
          title: "问卷2",
          isPublished: true,
          isStar: true,
          answerCount: 3,
          createdAt: "3月11日 13:23",
        },
        {
          id: "q3",
          title: "问卷3",
          isPublished: false,
          isStar: false,
          answerCount: 6,
          createdAt: "3月12日 13:23",
        },
        {
          id: "q4",
          title: "问卷4",
          isPublished: false,
          isStar: false,
          answerCount: 6,
          createdAt: "3月12日 13:23",
        },
      ],
    };
  },
  mutations: {
    addQuestion(state) {
      const newQuestion = {
        id: "q" + (state.questionList.length + 1),
        title: "问卷" + (state.questionList.length + 1),
        isPublished: false,
        isStar: false,
        answerCount: 0,
        createdAt: new Date()
          .toLocaleString("zh-CN", {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(/\//g, "月")
          .replace(",", "日"),
      };
      state.questionList.push(newQuestion);
    },
    moveQuestion(state, id) {
      // const index = state.questionList.findIndex(
      //   (question) => question.id === id
      // );
      // if (index !== -1) {
      //   state.questionList.splice(index, 1);
      // }
      const index = state.questionList.findIndex((q) => q.id === id);
      state.questionList.splice(index, 1);
    },
  },
});

export default store;

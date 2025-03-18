import { createStore } from "vuex";

const store = createStore({
  state: () => {
    return {
      questionList: [
        {
          _id: "q1",
          title: "问卷1",
          isPublished: false,
          isStar: false,
          isDeleted: false,
          answerCount: 5,
          createdAt: "3月10日 13:23",
        },
        {
          _id: "q2",
          title: "问卷2",
          isPublished: true,
          isStar: true,
          isDeleted: false,
          answerCount: 3,
          createdAt: "3月11日 13:23",
        },
        {
          _id: "q3",
          title: "问卷3",
          isPublished: false,
          isStar: false,
          isDeleted: false,
          answerCount: 6,
          createdAt: "3月12日 13:23",
        },
        {
          _id: "q4",
          title: "问卷4",
          isPublished: false,
          isStar: false,
          isDeleted: false,
          answerCount: 6,
          createdAt: "3月12日 13:23",
        },
      ],
    };
  },
  mutations: {
    // 添加问卷
    addQuestion(state) {
      const newQuestion = {
        _id: "q" + (state.questionList.length + 1),
        title: "问卷" + (state.questionList.length + 1),
        isPublished: false,
        isStar: false,
        isDeleted: false,
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
    // 移动问卷
    moveQuestion(state, ids) {
      ids.forEach((id: string) => {
        const index = state.questionList.findIndex((q) => q._id === id);
        if (index !== -1) {
          state.questionList[index].isDeleted =
            !state.questionList[index].isDeleted;
        }
      });
    },
    // 彻底删除问卷
    deleteQuestion(state, ids) {
      ids.forEach((id: string) => {
        const index = state.questionList.findIndex((q) => q._id === id);
        state.questionList.splice(index, 1);
      });
    },
    // 更新问卷标星状态
    starQuestionList(state, id) {
      const index = state.questionList.findIndex((q) => q._id === id);
      state.questionList[index].isStar = !state.questionList[index].isStar;
    },
  },
});

export default store;

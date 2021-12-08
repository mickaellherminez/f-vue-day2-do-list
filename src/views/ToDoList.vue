<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4" cols="12">
        <h2>
          {{ $t("TO_DO_LIST") }}
        </h2>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" class="col-sm-6">
                <v-autocomplete
                  v-model="friends"
                  :disabled="isUpdating"
                  :items="people"
                  chips
                  label="Select"
                  class="pb-6"
                  item-text="name"
                  item-value="name"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      @click="data.select"
                      @click:close="remove(data.item)"
                    >
                      <v-avatar left>
                        <v-img :src="data.item.avatar"></v-img>
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content
                        v-text="data.item"
                      ></v-list-item-content>
                    </template>
                    <template v-else>
                      <v-list-item-avatar>
                        <img :src="data.item.avatar" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="data.item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-html="data.item.group"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" class="col-sm-6">
                <v-text-field
                  :disabled="!friends"
                  class="pt-5"
                  label="New ToDo"
                  v-model="task"
                  v-on:keyup.enter="addTask(task, friends)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-btn
          class="ma-0"
          style="width: 100%; height: 50px"
          outlined
          @click="addTask(task, friends)"
          color="indigo"
          :disabled="!friends || !task"
          depressed
        >
          Add ToDo
        </v-btn>

        <h2 class="ma-2">List</h2>
        <v-divider inset class="ma-2"></v-divider>
        <span v-for="(task, index) in taskList" :key="index">
          <p :style="{ backgroundColor: task.color }">
            <strong>{{ task.name }}: {{ task.task }}</strong>
            {{ task.date.substring(0, 24) }}

            <v-btn
              class="ml-2"
              color="error"
              fab
              x-small
              dark
              @click="deleteTask(index)"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>

            <v-btn
              class="ml-2"
              color="white"
              fab
              x-small
              :to="{ name: 'task', params: { item: task.id } }"
            >
              <v-icon>mdi-card-account-details</v-icon>
            </v-btn>
          </p>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Resources from "@/services/utils/resources/resources";
import UtilsService from "@/services/utils/utils";
import { mapMutations } from "vuex";

const ResourcesService = new Resources();
const utils = new UtilsService();

export default {
  name: "ToDoList",
  data: () => ({
    task: "",
    taskList: [],
    isUpdating: false,
    friend: undefined,
    characters: [],
    friends: [],
    people:[]
  }),
  methods: {
    ...mapMutations({
      editColorToolbar: "updateColorToolbar",
      editColorToolbarText: "updateColorToolbarText",
      editNameToolbar: "updateNameToolbar",
    }),
    addTask(task, friend) {
      ResourcesService.getGender(friend.split(" ")[0]).then(
        (res) => {
          this.taskList.push({
            id: utils.uuid(),
            name: friend,
            task: task,
            done: false,
            date: Date(Date.now()).toString(),
            color: res.data.gender === "male" ? "aqua" : "pink",
          });
          localStorage.setItem("todos", JSON.stringify(this.taskList));
          this.task = "";
          this.friends = "";
        },
        (err) => {
          console.log(err);
        }
      );
    },
    remove() {
      this.friends = "";
    },

    deleteTask(index) {
      let todosTemp = JSON.parse(localStorage.getItem("todos"));
      todosTemp = todosTemp.filter((el, i) => i !== index);
      localStorage.setItem("todos", JSON.stringify(todosTemp));
      this.taskList = todosTemp;
    },
  },
  computed: {
     currentValue() {
        return this.$store.state.colorToolbar; 
      }
  },
  mounted() {
    this.$i18n.locale = "fr";

    ResourcesService.getCharacters().then(
      (res) => {
        this.characters = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  },
  created: function () {
    let tasks = JSON.parse(localStorage.getItem("todos"));
    tasks.forEach((el) => {
      this.addTask(el.task, el.name);
    });
  },
  watch: {
    characters(val) {
      let tempArray = [];
      val.forEach((element) => {
        //  if (i === 0) tempArray.push({ header: 'Group 1' }, { header: 'Group 2' })
        if (
          [
            "Penny",
            "Bernadette Maryann Rostenkowski",
            "Amy Farrah Fowler",
          ].indexOf(element.name) !== -1
        ) {
          tempArray.push({
            id: element.id,
            name: element.name,
            group: "Group 1",
            avatar: `http://82.165.96.74:1337${element.picture.url}`,
          });
        } else {
          tempArray.push({
            id: element.id,
            name: element.name,
            group: "Group 2",
            avatar: `http://82.165.96.74:1337${element.picture.url}`,
          });
        }
      });
      this.people = tempArray;
    },
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },
};
</script>
<style>
p {
  display: fleinlinex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #212121;
  padding: 12px 24px;
  border-radius: 6px;
  margin-bottom: 12px;
}
</style>

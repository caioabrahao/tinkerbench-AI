<script setup lang="ts">
import { ref, computed } from "vue";
import { marked } from "marked";
import { promptGemini, promptGeminiStream } from "../scripts/geminiFunctions";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Logo from "../components/Logo.vue";
gsap.registerPlugin(ScrollToPlugin)

const areaOfInterest = ref<string>("");
const skillLevel = ref<string>("");
const projectScope = ref<string>("");

const generatedText = ref<string>("<h1>Select some Idea Options to Begin</h1>");
const rendered = ref<boolean>(false);


const systemInstructions: string = `Create a cool name for it and use it as the title.
   Format the responde in markdown.
   Use a friendly tone and present the idea in a simple and approachable way.
   Use emojis to make it fun!`;
const prompt = computed(() => {
  return `Generate a creative and unique project idea
   for ${areaOfInterest.value} 
   with a skill level of ${skillLevel.value} 
   and a project scope of ${projectScope.value}.`;
});

const formattedText = computed(() => {
  return marked(generatedText.value);
});

async function run(){
    if(areaOfInterest.value !== "" && skillLevel.value !== "" && projectScope.value !== ""){
        rendered.value = true;
        generatedText.value = "Generating Content...";
        generatedText.value = await promptGemini(prompt.value, systemInstructions);
    }
    else{
        rendered.value = true;
        generatedText.value = "Please select an option for each category";
    }
}
</script>

<template>
<section class="screen">
    <div class="sideBar">
    <Logo />
    <div class="options">
    <div class="option-set">
      <label>Area of Interest:</label>
      <div>
        <input type="radio" id="ai" value="AI" v-model="areaOfInterest">
        <label for="ai">AI</label>
      </div>
      <div>
        <input type="radio" id="web" value="Web Development" v-model="areaOfInterest">
        <label for="web">Web Development</label>
      </div>
      <div>
        <input type="radio" id="mobile" value="Mobile Development" v-model="areaOfInterest">
        <label for="mobile">Mobile Development</label>
      </div>
    </div>

    <div class="option-set">
      <label>Skill Level:</label>
      <div>
        <input type="radio" id="beginner" value="Beginner" v-model="skillLevel">
        <label for="beginner">Beginner</label>
      </div>
      <div>
        <input type="radio" id="intermediate" value="Intermediate" v-model="skillLevel">
        <label for="intermediate">Intermediate</label>
      </div>
      <div>
        <input type="radio" id="advanced" value="Advanced" v-model="skillLevel">
        <label for="advanced">Advanced</label>
      </div>
    </div>

    <div class="option-set">
      <label>Project Scope:</label>
      <div>
        <input type="radio" id="small" value="Small" v-model="projectScope">
        <label for="small">Small</label>
      </div>
      <div>
        <input type="radio" id="medium" value="Medium" v-model="projectScope">
        <label for="medium">Medium</label>
      </div>
      <div>
        <input type="radio" id="large" value="Large" v-model="projectScope">
        <label for="large">Large</label>
      </div>
    </div>
  </div>

  <button class="button" @click="run">Generate Idea</button>
</div>
<div class="content">
    <div class="generatedText markdown-content" id="generatedText">
        <div v-html="formattedText"></div>
  </div>
</div>

</section>
</template>

<style scoped>
.screen{
    display: flex;
}
.content{
    padding: 32px 128px;
    width: 80%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #212121;
    color: white;
}

.sideBar{
    height: 100vh;
    width: 20%;
    background-color: #121212;
    color: white;
    display: flex;
    padding: 16px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;

    .options{
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .option-set{
        display: flex;
        flex-direction: column;
        gap: 8px;

        label{
            font-size: 1rem;
        }
    }
}
</style>
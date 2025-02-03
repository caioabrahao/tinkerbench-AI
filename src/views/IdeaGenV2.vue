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


const systemInstructions: string = `You are a creative professor and your students asked you for
a cool summer project idea. You have to come up with a creative and unique project idea. Make sure to:
   Format the responde in markdown.
   Use a friendly tone and present the idea in a simple and approachable way.
   Use emojis to make it fun!
   You response is the PDF your students will receive. Don't mention summer, be direct about
   the project proposal, but keeping it fun and engaging.`;
const prompt = computed(() => {
  return `I want to work with ${areaOfInterest.value}.
  I am a ${skillLevel.value} developer. 
   and a project scope of ${projectScope.value}.`;
});

const formattedText = computed(() => {
  return marked(generatedText.value);
});

async function run() {
  if (areaOfInterest.value !== "" && skillLevel.value !== "" && projectScope.value !== "") {
    rendered.value = true;
    generatedText.value = "Generating Content...";
    
    // Set a timeout to change the text to 'Error has occurred' after 5 seconds
    const timeoutId = setTimeout(() => {
      if (generatedText.value === "Generating Content...") {
        generatedText.value = "Sorry! An error has Occurred! 😱 <br> Please try again later...";
      }
    }, 5000);

    try {
      generatedText.value = await promptGemini(prompt.value, systemInstructions);
    } catch (error) {
      generatedText.value = "Error has occurred";
    } finally {
      clearTimeout(timeoutId); // Clear the timeout if the content is generated successfully
    }
  } else {
    generatedText.value = "Please select an option for each category";
    gsap.to('#generatedText', { duration: 1, opacity: .5, ease: "power2" });
    gsap.to('#generatedText', { duration: .5, opacity: 1, ease: "power2", delay: 1 });
  }
}

const runStreamed = async () => {
  if (areaOfInterest.value !== "" && skillLevel.value !== "" && projectScope.value !== ""){
    generatedText.value = "";
  for await (const chunk of promptGeminiStream(prompt.value, systemInstructions)) {
    generatedText.value += chunk;
  }
  } else{
    generatedText.value = "Please select an option for each category";
    gsap.to('#generatedText', { duration: 1, opacity: .5, ease: "power2" });
    gsap.to('#generatedText', { duration: .5, opacity: 1, ease: "power2", delay: 1 });
  }
  }

</script>

<template>
<section class="screen">
    <div class="sideBar">
      <div class="logo">
        <Logo/>
        <p>IdeaGen Experimental Build - 2.1.0</p>
      </div>
    
    <div class="options">
    <div class="option-set">
      <label class="headingLabel">Area of Interest:</label>
      <div>
        <input type="radio" id="ai" value="AI" v-model="areaOfInterest">
        <label for="ai" class="option-label">AI</label>
      </div>
      <div>
        <input type="radio" id="web" value="Web Development" v-model="areaOfInterest">
        <label for="web" class="option-label">Web Development</label>
      </div>
      <div>
        <input type="radio" id="mobile" value="Mobile Development" v-model="areaOfInterest">
        <label for="mobile" class="option-label">Mobile Development</label>
      </div>
    </div>

    <div class="option-set">
      <label class="headingLabel">Skill Level:</label>
      <div>
        <input type="radio" id="beginner" value="Beginner" v-model="skillLevel">
        <label for="beginner" class="option-label">Beginner</label>
      </div>
      <div>
        <input type="radio" id="intermediate" value="Intermediate" v-model="skillLevel">
        <label for="intermediate" class="option-label">Intermediate</label>
      </div>
      <div>
        <input type="radio" id="advanced" value="Advanced" v-model="skillLevel">
        <label for="advanced" class="option-label">Advanced</label>
      </div>
    </div>

    <div class="option-set">
      <label class="headingLabel">Project Scope:</label>
      <div>
        <input type="radio" id="small" value="Small" v-model="projectScope">
        <label for="small" class="option-label">Small</label>
      </div>
      <div>
        <input type="radio" id="medium" value="Medium" v-model="projectScope">
        <label for="medium" class="option-label">Medium</label>
      </div>
      <div>
        <input type="radio" id="large" value="Large" v-model="projectScope">
        <label for="large" class="option-label">Large</label>
      </div>
    </div>
  </div>

  <button class="button" @click="runStreamed">Generate Idea</button>

  <div class="sidebar-notes">
    <a href="https://github.com/caioabrahao/tinkerbench-AI/issues/new?template=Blank+issue" target="_blank">Report a Bug</a>
    <a href="https://github.com/caioabrahao/tinkerbench-AI" target="_blank">Git Repo</a>
  </div>
</div>
<div class="content">
    <div class="generatedText markdown-content" id="generatedText">
        <div v-html="formattedText"></div>
        <p class="footnote">TinkerbenchAi - Experimental Build - Responses might be Repetitive at this time</p>
  </div>
</div>

</section>
</template>

<style scoped>
.logo{
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
    flex-direction: column;

    p{
        font-size: .8rem;
        color: #888;
        text-align: center;
    }
}
.footnote{
    font-size: 0.8rem;
    color: #888;
    text-align: center;
    position: absolute;
    left: 60%;
    transform: translateX(-50%);
    bottom: 16px;
}
.screen{
    display: flex;
}
.content{
    padding: 32px 128px;
    width: 85%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #212121;
    color: white;
}

.sideBar{
    height: 100vh;
    width: 15%;
    background-color: #121212;
    color: white;
    display: flex;
    padding: 32px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 16px;

    .options{
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .option-set{
        display: flex;
        flex-direction: column;
        gap: 8px;

        .option-label{
            font-size: .85rem;
        }

        .headingLabel{
            font-size: 1rem;
            font-weight: bold;
        }
    }
}

.sidebar-notes{
    margin-top: auto;
    font-size: .8rem;
    text-align: center;

    display: flex;
    justify-content: space-around;

    a{
        color: #888;
        text-decoration: none;
    }
}
</style>
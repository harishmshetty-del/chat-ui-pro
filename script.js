let chatBox = document.getElementById("chatBox");
let typing = document.getElementById("typing");

const replies = {
    "hi": "Hello 👋",
    "hello": "Hi there 😊",
    "what is html": "HTML builds structure of websites.",
    "what is css": "CSS styles websites beautifully.",
    "what is javascript": "JavaScript makes websites interactive.",
    "how to learn coding": "Practice daily + build projects 🚀",
    "what is frontend": "Frontend is what users see.",
    "what is backend": "Backend handles server logic.",
    "bye": "Goodbye 👋"
};

// LOAD CHAT
window.onload = () => {
    let saved = localStorage.getItem("chat");
    if (saved) chatBox.innerHTML = saved;
};

// SAVE CHAT
function save() {
    localStorage.setItem("chat", chatBox.innerHTML);
}

// TIME
function time() {
    return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// SEND MESSAGE
function send() {
    let input = document.getElementById("input");
    let text = input.value.toLowerCase().trim();

    if (!text) return;

    addMsg(text, "user");
    input.value = "";

    showTyping();

    setTimeout(() => {
        hideTyping();

        let reply = "🤖 I don't know that yet.";

        for (let key in replies) {
            if (text.includes(key)) {
                reply = replies[key];
                break;
            }
        }

        addMsg(reply, "bot");
        save();
    }, 600);
}

// MESSAGE UI
function addMsg(text, type) {
    let div = document.createElement("div");
    div.classList.add("msg", type);

    div.innerHTML = `
        ${text}
        <div class="time">${time()}</div>
    `;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// QUICK BUTTONS
function quick(text) {
    document.getElementById("input").value = text;
    send();
}

// TYPING
function showTyping() {
    typing.style.display = "block";
}
function hideTyping() {
    typing.style.display = "none";
}

// DARK MODE (simple)
function toggleDark() {
    document.body.classList.toggle("dark");
}

// CLEAR CHAT
function clearChat() {
    chatBox.innerHTML = "";
    localStorage.removeItem("chat");
}
document.addEventListener('DOMContentLoaded', () => {
    const modules = document.querySelectorAll('.module');
    const buttons = document.querySelectorAll('.feature-buttons button');
    const ctaBtn = document.querySelector('.cta-btn');

    // Show modules section when CTA is clicked
    ctaBtn.addEventListener('click', () => {
        document.getElementById('modules').scrollIntoView({ behavior: 'smooth' });
        modules.forEach(module => module.style.display = 'none');
        document.getElementById('communication').style.display = 'block';
    });

    // Navigation between modules
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            modules.forEach(module => module.style.display = 'none');
            document.getElementById(button.id.replace('Btn', '')).style.display = 'block';
            document.getElementById('modules').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Communication Module
    const communicationGrid = document.getElementById('communicationGrid');
    const sentenceBuilder = document.getElementById('sentenceBuilder');
    let sentence = [];

    const items = JSON.parse(localStorage.getItem('communicationItems')) || [
        { src: 'image1.jpg', text: 'I want water' },
        { src: 'image2.jpg', text: 'I am happy' },
    ];

    items.forEach(item => {
        const element = item.src.endsWith('.mp4') ? document.createElement('video') : document.createElement('img');
        element.src = item.src;
        element.addEventListener('click', () => {
            sentence.push(item.text);
            sentenceBuilder.textContent = sentence.join(' ');
            speak(item.text);
        });
        communicationGrid.appendChild(element);
    });

    // Social Skills Training
    const scenarios = [
        { question: 'What do you say when someone says hi?', options: ['Bye', 'Thank you', 'Hi'], answer: 'Hi' },
        { question: 'What do you say when you meet a new peer at school?', options: ['Nice to meet you', 'Goodbye', 'I`m hungry'], answer: 'Nice to meet you' },
        { question: 'What do you say if somebody waves at you?', options: ['Walk away', 'Wave back', 'Say thank you'], answer: 'Wave back' },
        { question: 'How do you start talking to somebody during lunch?', options: ['Hi, can I sit with you?', 'I`m leaving now', 'Pass me the juice'], answer: 'Hi, can I sit with you?' },
        { question: 'What do you say if somebody asks your name?', options: ['No, I don`t have one', 'I`m busy', 'My name is [Name]'], answer: 'My name is [Name]' },
        { question: 'What do you say when somebody asks to play with your toy?', options: ['No, it`s mine', 'I don`t like toys', 'Sure, you can play with it'], answer: 'Sure, you can play with it' },
        { question: 'What do you say when it`s your turn in Simon Says?', options: ['I`m ready to play', 'Simon says touch your nose', 'It`s not my turn'], answer: 'I`m ready to play' },
        { question: 'What do you do if somebody is waiting for their turn in a game?', options: ['Keep playing', 'Let them go next', 'Tell them to leave'], answer: 'Let them go next' },
        { question: 'What do you say if you want to share your snack with somebody?', options: ['Don`t touch my snack', 'Do you want some?', 'I`m eating now'], answer: 'Do you want some?' },
        { question: 'What do you say when you finish your turn in Hide and Seek?', options: ['I`m done, your turn', 'I won, you`re out', 'Let`s eat'], answer: 'I`m done, your turn' },
        { question: 'What do you say if you need help with a puzzle?', options: ['Go away', 'I`m fine', 'Can you help me?'], answer: 'Can you help me?' },
        { question: 'What do you say if somebody is struggling with their backpack?', options: ['Do you need help?', 'Carry it yourself', 'I`m busy'], answer: 'Do you need help?' },
    
        // 35 New Scenarios
        { question: 'What do you say when someone says goodbye?', options: ['Hello', 'Goodbye', 'Stay here'], answer: 'Goodbye' },
        { question: 'What do you say if you bump into someone by accident?', options: ['I`m sorry', 'Watch out', 'That`s your fault'], answer: 'I`m sorry' },
        { question: 'What do you say when someone gives you a gift?', options: ['Thank you', 'I don`t want it', 'Give me more'], answer: 'Thank you' },
        { question: 'What do you do if someone looks sad?', options: [ 'Walk away','Ask if they`re okay', 'Laugh at them'], answer: 'Ask if they`re okay' },
        { question: 'What do you say when you want to join a game?', options: [ 'This is my game', 'Go play somewhere else','Can I play too?'], answer: 'Can I play too?' },
        { question: 'What do you say if someone says they like your shirt?', options: [ 'No, it`s ugly', 'I don`t care','Thank you'], answer: 'Thank you' },
        { question: 'What do you say when you need to leave the room?', options: [ 'Stay here forever','I`ll be right back', 'I`m not coming back'], answer: 'I`ll be right back' },
        { question: 'What do you say if someone asks how you feel?', options: ['I feel happy', 'Don`t ask me', 'I`m running away'], answer: 'I feel happy' },
        { question: 'What do you do if someone drops their pencil?', options: [ 'Keep walking','Pick it up for them', 'Kick it away'], answer: 'Pick it up for them' },
        { question: 'What do you say when you want to borrow a crayon?', options: [ 'This is mine now', 'Give it to me','Can I use this?'], answer: 'Can I use this?' },
        { question: 'What do you say if someone wins a game?', options: ['Good job!', 'You cheated', 'I don`t like you'], answer: 'Good job!' },
        { question: 'What do you say when you need more time to finish?', options: ['Can I have more time?', 'I`m done', 'This is too hard'], answer: 'Can I have more time?' },
        { question: 'What do you say if someone asks to sit next to you?', options: ['Sure, sit here', 'No, go away', 'I`m leaving'], answer: 'Sure, sit here' },
        { question: 'What do you say when you see a friend after a long time?', options: ['I missed you', 'Who are you?', 'Go home'], answer: 'I missed you' },
        { question: 'What do you do if someone is too loud?', options: ['Ask them to be quieter', 'Yell back', 'Run away'], answer: 'Ask them to be quieter' },
        { question: 'What do you say when you finish drawing a picture?', options: ['Look at my picture!', 'It`s bad', 'I`m not done'], answer: 'Look at my picture!' },
        { question: 'What do you say if someone asks what you’re playing?', options: ['I`m playing a game', 'None of your business', 'Stop talking'], answer: 'I`m playing a game' },
        { question: 'What do you say when you want to give someone a high-five?', options: ['High-five!', 'Don`t touch me', 'I`m busy'], answer: 'High-five!' },
        { question: 'What do you do if someone forgets your name?', options: ['Tell them your name', 'Get mad', 'Walk away'], answer: 'Tell them your name' },
        { question: 'What do you say when you’re ready to start a group activity?', options: ['Let`s start', 'I don`t want to', 'Wait for me'], answer: 'Let`s start' },
        { question: 'What do you say if someone spills their drink?', options: ['It`s okay, I`ll help', 'Clean it yourself', 'That`s funny'], answer: 'It`s okay, I`ll help' },
        { question: 'What do you say when you want to trade toys?', options: ['Want to trade?', 'This is better', 'Give me yours'], answer: 'Want to trade?' },
        { question: 'What do you say if someone says they’re tired?', options: ['Do you want to rest?', 'Keep going', 'I don`t care'], answer: 'Do you want to rest?' },
        { question: 'What do you say when you’re leaving a playdate?', options: ['See you later', 'I`m not coming back', 'Stay here'], answer: 'See you later' },
        { question: 'What do you do if someone is waiting to use the swing?', options: ['Let them have a turn', 'Keep swinging', 'Push them away'], answer: 'Let them have a turn' },
        { question: 'What do you say when you want to show someone your book?', options: ['Look at this!', 'It`s mine', 'Go read your own'], answer: 'Look at this!' },
        { question: 'What do you say if someone asks what time it is?', options: ['I`ll check', 'I don`t know', 'Ask someone else'], answer: 'I`ll check' },
        { question: 'What do you say when you’re done with your snack?', options: ['I`m finished', 'I want more', 'Throw it away'], answer: 'I`m finished' },
        { question: 'What do you say if someone is scared of a loud noise?', options: ['It`s okay', 'Be quiet', 'That`s loud'], answer: 'It`s okay' },
        { question: 'What do you say when you want to play outside?', options: ['Can we go outside?', 'Stay inside', 'I`m staying here'], answer: 'Can we go outside?' },
        { question: 'What do you do if someone is carrying too many books?', options: ['Offer to carry some', 'Let them drop', 'Walk past'], answer: 'Offer to carry some' },
        { question: 'What do you say when you’re happy about a new toy?', options: ['I like this!', 'It`s boring', 'Give it back'], answer: 'I like this!' },
        { question: 'What do you say if someone asks to join your drawing?', options: ['Sure, let`s draw', 'No, it`s mine', 'I`m done'], answer: 'Sure, let`s draw' },
        { question: 'What do you say when you need to wait your turn?', options: ['I`ll wait', 'Go faster', 'It`s my turn now'], answer: 'I`ll wait' },
        { question: 'What do you say if someone says they’re your friend?', options: ['You`re my friend too', 'I don`t like you', 'Go away'], answer: 'You`re my friend too' }
    ];

    const scenarioDiv = document.getElementById('scenario');
    const optionsDiv = document.getElementById('options');
    const feedbackDiv = document.getElementById('feedback');

    function loadScenario() {
        const randomIndex = Math.floor(Math.random() * scenarios.length);
        const scenario = scenarios[randomIndex];
        scenarioDiv.textContent = scenario.question;
        optionsDiv.innerHTML = '';
        scenario.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => {
                feedbackDiv.textContent = option === scenario.answer ? 'Great job!' : 'Let’s try again';
                setTimeout(loadScenario, 1000);
            });
            optionsDiv.appendChild(button);
        });
    }

    loadScenario();

    // Routine Manager
    const routineList = document.getElementById('routineList');
    const routines = JSON.parse(localStorage.getItem('routines')) || [
        { task: 'Brush teeth', completed: false },
        { task: 'Eat breakfast', completed: false },
    ];

    routines.forEach(routine => {
        const li = document.createElement('li');
        li.textContent = routine.task;
        if (routine.completed) li.classList.add('completed');
        li.addEventListener('click', () => {
            routine.completed = !routine.completed;
            li.classList.toggle('completed');
            localStorage.setItem('routines', JSON.stringify(routines));
        });
        routineList.appendChild(li);
    });

    // Settings (Upload Functionality)
    const uploadInput = document.getElementById('upload');
    const saveSettingsBtn = document.getElementById('saveSettings');

    saveSettingsBtn.addEventListener('click', () => {
        const file = uploadInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newItem = { src: e.target.result, text: 'New item' };
                items.push(newItem);
                localStorage.setItem('communicationItems', JSON.stringify(items));
                const element = file.type.startsWith('video') ? document.createElement('video') : document.createElement('img');
                element.src = newItem.src;
                element.addEventListener('click', () => {
                    sentence.push(newItem.text);
                    sentenceBuilder.textContent = sentence.join(' ');
                    speak(newItem.text);
                });
                communicationGrid.appendChild(element);
            };
            reader.readAsDataURL(file);
        }
    });

    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
});
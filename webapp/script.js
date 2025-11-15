// Comprehensive Quiz Questions Database
const quizQuestions = {
    programming: {
        easy: [
            {
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Tech Modern Language", 
                    "Hyper Transfer Markup Language",
                    "Home Tool Markup Language"
                ],
                correct: 0,
                explanation: "HTML stands for Hyper Text Markup Language, used for creating web pages."
            },
            {
                question: "Which language is used for styling web pages?",
                options: ["HTML", "JavaScript", "CSS", "Python"],
                correct: 2,
                explanation: "CSS (Cascading Style Sheets) is used for styling web pages."
            },
            {
                question: "What is the correct file extension for JavaScript files?",
                options: [".java", ".js", ".javascript", ".script"],
                correct: 1,
                explanation: "JavaScript files use the .js extension."
            },
            {
                question: "Which tag is used to create a hyperlink in HTML?",
                options: ["<link>", "<a>", "<href>", "<hyperlink>"],
                correct: 1,
                explanation: "The <a> tag is used to create hyperlinks in HTML."
            },
            {
                question: "What does CSS stand for?",
                options: [
                    "Computer Style Sheets",
                    "Creative Style System",
                    "Cascading Style Sheets", 
                    "Colorful Style Sheets"
                ],
                correct: 2,
                explanation: "CSS stands for Cascading Style Sheets."
            },
            {
                question: "Which symbol is used for single-line comments in JavaScript?",
                options: ["//", "/*", "#", "--"],
                correct: 0,
                explanation: "// is used for single-line comments in JavaScript."
            },
            {
                question: "What is the default method for form submission in HTML?",
                options: ["POST", "GET", "PUT", "DELETE"],
                correct: 1,
                explanation: "GET is the default method for form submission."
            },
            {
                question: "Which property is used to change the background color in CSS?",
                options: ["color", "bgcolor", "background-color", "background"],
                correct: 2,
                explanation: "background-color property is used to change background color."
            },
            {
                question: "What does DOM stand for in web development?",
                options: [
                    "Data Object Model",
                    "Document Object Model",
                    "Digital Output Model",
                    "Display Object Management"
                ],
                correct: 1,
                explanation: "DOM stands for Document Object Model."
            },
            {
                question: "Which HTML tag is used for the largest heading?",
                options: ["<h6>", "<heading>", "<h1>", "<head>"],
                correct: 2,
                explanation: "<h1> is used for the largest heading."
            }
        ],
        medium: [
            {
                question: "What is the purpose of the 'this' keyword in JavaScript?",
                options: [
                    "Refers to the current function",
                    "Refers to the parent element", 
                    "Refers to the current object",
                    "Refers to the global scope"
                ],
                correct: 2,
                explanation: "'this' refers to the current object in JavaScript."
            },
            {
                question: "Which method is used to parse a JSON string into an object?",
                options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.decode()"],
                correct: 0,
                explanation: "JSON.parse() converts JSON string to JavaScript object."
            },
            {
                question: "What is closure in JavaScript?",
                options: [
                    "A function with no parameters",
                    "A function that has access to its outer function's scope",
                    "A way to close a program", 
                    "A method to hide variables"
                ],
                correct: 1,
                explanation: "Closure allows a function to access its outer function's scope."
            }
        ]
    },
    general: {
        easy: [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                correct: 2,
                explanation: "Paris is the capital city of France."
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correct: 1,
                explanation: "Mars is known as the Red Planet due to its reddish appearance."
            },
            {
                question: "What is the largest mammal in the world?",
                options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                correct: 1,
                explanation: "The Blue Whale is the largest mammal on Earth."
            }
        ]
    }
};

// Main Quiz Application Class
class QuizApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.timePerQuestion = [];
        this.timerInterval = null;
        this.timeLeft = 30;
        this.selectedCategory = 'programming';
        this.selectedDifficulty = 'easy';
        this.questions = [];
        this.quizStartTime = null;
        this.totalQuizTime = 0;
        
        this.initializeApp();
    }

    initializeApp() {
        this.bindElements();
        this.attachEventListeners();
        console.log("Quiz application initialized successfully");
    }

    bindElements() {
        // Page containers
        this.landingPage = document.getElementById('landingPage');
        this.quizPage = document.getElementById('quizPage');
        this.resultsPage = document.getElementById('resultsPage');
        
        // Landing page elements
        this.usernameInput = document.getElementById('username');
        this.categorySelect = document.getElementById('categorySelect');
        this.difficultySelect = document.getElementById('difficultySelect');
        this.startBtn = document.getElementById('startBtn');
        
        // Quiz page elements
        this.timerDisplay = document.getElementById('timer');
        this.currentQuestionDisplay = document.getElementById('currentQuestion');
        this.totalQuestionsDisplay = document.getElementById('totalQuestions');
        this.questionText = document.getElementById('questionText');
        this.optionsContainer = document.getElementById('optionsContainer');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.questionNav = document.getElementById('questionNav');
        this.scoreDisplay = document.getElementById('scoreValue');
        
        // Results page elements
        this.totalScoreDisplay = document.getElementById('totalScore');
        this.correctAnswersDisplay = document.getElementById('correctAnswers');
        this.wrongAnswersDisplay = document.getElementById('wrongAnswers');
        this.totalTimeDisplay = document.getElementById('totalTime');
        this.detailedAnalysis = document.getElementById('detailedAnalysis');
        this.restartBtn = document.getElementById('restartBtn');
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.prevBtn.addEventListener('click', () => this.navigateToPreviousQuestion());
        this.nextBtn.addEventListener('click', () => this.navigateToNextQuestion());
        this.submitBtn.addEventListener('click', () => this.submitQuiz());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
    }

    startQuiz() {
        const username = this.usernameInput.value.trim() || 'Quiz Champion';
        this.selectedCategory = this.categorySelect.value;
        this.selectedDifficulty = this.difficultySelect.value;
        
        // Get questions based on selection
        this.questions = this.getQuestions();
        
        if (this.questions.length === 0) {
            alert('No questions available for selected category/difficulty.');
            return;
        }

        // Initialize quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.timePerQuestion = new Array(this.questions.length).fill(0);
        this.quizStartTime = Date.now();
        
        // Update UI
        this.showScreen('quizPage');
        this.hideScreen('landingPage');
        this.totalQuestionsDisplay.textContent = this.questions.length;
        this.scoreDisplay.textContent = '0';
        
        // Initialize navigation and load first question
        this.initializeQuestionNavigation();
        this.loadCurrentQuestion();
        
        console.log(`Quiz started: ${username}, ${this.selectedCategory}, ${this.selectedDifficulty}`);
    }

    getQuestions() {
        const category = quizQuestions[this.selectedCategory];
        if (category && category[this.selectedDifficulty]) {
            return category[this.selectedDifficulty];
        }
        return quizQuestions.programming.easy; // Fallback
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    hideScreen(screenId) {
        document.getElementById(screenId).classList.remove('active');
    }

    initializeQuestionNavigation() {
        this.questionNav.innerHTML = '';
        this.questions.forEach((_, index) => {
            const navButton = document.createElement('button');
            navButton.className = 'nav-btn';
            navButton.textContent = index + 1;
            navButton.addEventListener('click', () => this.navigateToQuestion(index));
            this.questionNav.appendChild(navButton);
        });
        this.updateQuestionNavigation();
    }

    updateQuestionNavigation() {
        const navButtons = this.questionNav.querySelectorAll('.nav-btn');
        navButtons.forEach((button, index) => {
            button.classList.remove('current', 'answered');
            
            if (index === this.currentQuestionIndex) {
                button.classList.add('current');
            }
            if (this.userAnswers[index] !== null) {
                button.classList.add('answered');
            }
        });
    }

    loadCurrentQuestion() {
        // Clear previous timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        // Update question display
        this.questionText.textContent = currentQuestion.question;
        this.currentQuestionDisplay.textContent = this.currentQuestionIndex + 1;
        
        // Load options
        this.renderOptions(currentQuestion.options);
        
        // Update navigation state
        this.updateNavigationButtons();
        this.updateQuestionNavigation();
        
        // Start timer for this question
        this.startQuestionTimer();
    }

    renderOptions(options) {
        this.optionsContainer.innerHTML = '';
        
        options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            
            // Mark as selected if previously answered
            if (this.userAnswers[this.currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', () => this.selectOption(index));
            this.optionsContainer.appendChild(optionElement);
        });
    }

    selectOption(optionIndex) {
        // Record time spent if this is the first answer
        if (this.userAnswers[this.currentQuestionIndex] === null) {
            const timeSpent = 30 - this.timeLeft;
            this.timePerQuestion[this.currentQuestionIndex] = timeSpent;
        }
        
        // Save user's answer
        this.userAnswers[this.currentQuestionIndex] = optionIndex;
        
        // Update UI to show selection
        const options = this.optionsContainer.querySelectorAll('.option');
        options.forEach(option => option.classList.remove('selected'));
        options[optionIndex].classList.add('selected');
        
        // Update navigation
        this.updateQuestionNavigation();
    }

    startQuestionTimer() {
        this.timeLeft = 30;
        this.timerDisplay.textContent = this.timeLeft;
        this.timerDisplay.style.color = '#27ae60';
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.timerDisplay.textContent = this.timeLeft;
            
            // Change color when time is running out
            if (this.timeLeft <= 10) {
                this.timerDisplay.style.color = '#e74c3c';
            }
            
            // Auto-proceed when time runs out
            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.handleTimeUp();
            }
        }, 1000);
    }

    handleTimeUp() {
        // Record that no answer was given
        if (this.userAnswers[this.currentQuestionIndex] === null) {
            this.timePerQuestion[this.currentQuestionIndex] = 30;
        }
        this.navigateToNextQuestion();
    }

    updateNavigationButtons() {
        // Previous button
        this.prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // Next/Submit buttons
        const isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;
        this.nextBtn.classList.toggle('hidden', isLastQuestion);
        this.submitBtn.classList.toggle('hidden', !isLastQuestion);
    }

    navigateToPreviousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.saveCurrentQuestionTime();
            this.currentQuestionIndex--;
            this.loadCurrentQuestion();
        }
    }

    navigateToNextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.saveCurrentQuestionTime();
            this.currentQuestionIndex++;
            this.loadCurrentQuestion();
        }
    }

    navigateToQuestion(questionIndex) {
        if (questionIndex >= 0 && questionIndex < this.questions.length) {
            this.saveCurrentQuestionTime();
            this.currentQuestionIndex = questionIndex;
            this.loadCurrentQuestion();
        }
    }

    saveCurrentQuestionTime() {
        if (this.userAnswers[this.currentQuestionIndex] === null) {
            this.timePerQuestion[this.currentQuestionIndex] = 30 - this.timeLeft;
        }
    }

    submitQuiz() {
        // Clear timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        // Calculate total quiz time
        this.totalQuizTime = Date.now() - this.quizStartTime;
        
        // Calculate score
        this.calculateScore();
        
        // Show results
        this.showResults();
    }

    calculateScore() {
        this.score = 0;
        this.questions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correct) {
                this.score++;
            }
        });
    }

    showResults() {
        this.showScreen('resultsPage');
        this.hideScreen('quizPage');
        
        const totalQuestions = this.questions.length;
        const correctAnswers = this.score;
        const wrongAnswers = totalQuestions - correctAnswers;
        const totalTimeSeconds = Math.round(this.totalQuizTime / 1000);
        
        // Update summary
        this.totalScoreDisplay.textContent = `${correctAnswers}/${totalQuestions}`;
        this.correctAnswersDisplay.textContent = correctAnswers;
        this.wrongAnswersDisplay.textContent = wrongAnswers;
        this.totalTimeDisplay.textContent = `${totalTimeSeconds}s`;
        
        // Create performance chart
        this.createPerformanceChart(correctAnswers, wrongAnswers);
        
        // Show detailed analysis
        this.showDetailedAnalysis();
    }

    createPerformanceChart(correct, wrong) {
        const canvas = document.getElementById('performanceChart');
        const ctx = canvas.getContext('2d');
        
        // Clear previous chart
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Chart data
        const total = correct + wrong;
        const correctPercentage = total > 0 ? (correct / total) * 100 : 0;
        const wrongPercentage = total > 0 ? (wrong / total) * 100 : 0;
        
        // Draw chart
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        
        // Correct answers segment (green)
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 0, (correctPercentage / 100) * 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#27ae60';
        ctx.fill();
        
        // Wrong answers segment (red)
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, (correctPercentage / 100) * 2 * Math.PI, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        
        // Add labels
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Correct: ${correct} (${correctPercentage.toFixed(1)}%)`, centerX, centerY - 100);
        ctx.fillText(`Wrong: ${wrong} (${wrongPercentage.toFixed(1)}%)`, centerX, centerY + 120);
    }

    showDetailedAnalysis() {
        this.detailedAnalysis.innerHTML = '';
        
        this.questions.forEach((question, index) => {
            const userAnswerIndex = this.userAnswers[index];
            const isCorrect = userAnswerIndex === question.correct;
            const userAnswer = userAnswerIndex !== null ? question.options[userAnswerIndex] : 'Not answered';
            const correctAnswer = question.options[question.correct];
            const timeSpent = this.timePerQuestion[index];
            
            const resultItem = document.createElement('div');
            resultItem.className = `result-item ${isCorrect ? 'correct' : 'incorrect'}`;
            
            resultItem.innerHTML = `
                <h4>Question ${index + 1}</h4>
                <p><strong>Question:</strong> ${question.question}</p>
                <p><strong>Your Answer:</strong> ${userAnswer}</p>
                <p><strong>Correct Answer:</strong> ${correctAnswer}</p>
                <p><strong>Time Spent:</strong> ${timeSpent}s</p>
                <p><strong>Explanation:</strong> ${question.explanation || 'No explanation available.'}</p>
                <p><strong>Result:</strong> ${isCorrect ? '✅ Correct' : '❌ Incorrect'}</p>
            `;
            
            this.detailedAnalysis.appendChild(resultItem);
        });
    }

    restartQuiz() {
        this.showScreen('landingPage');
        this.hideScreen('resultsPage');
        
        // Reset form
        this.usernameInput.value = 'Quiz Champion';
        this.categorySelect.value = 'programming';
        this.difficultySelect.value = 'easy';
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

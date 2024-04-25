var lives = 3; // Leben initialisieren
    var score = 0; // Punktzahl initialisieren
    var timeLeft = 60; // Timer auf 60 Sekunden setzen
    var timerInterval; // Variable für den Timer-Intervall
    var correctAnswer; // Variable für die richtige Antwort
    var difficultyLevel; // Variable für den Schwierigkeitsgrad

    // Starten des Spiels mit dem ausgewählten Schwierigkeitsgrad
    function startGame(difficulty) {
        difficultyLevel = difficulty; // Schwierigkeitsgrad speichern
        setDifficulty(difficulty); // Schwierigkeitsgrad einstellen
        document.getElementById('start-menu').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        startTimer(); // Timer starten
        // Fokus auf das Antwortfeld setzen
        document.getElementById("answer").focus();
    }

    // Schwierigkeitsgrad einstellen
    function setDifficulty(difficulty) {
        switch(difficulty) {
            case 'leicht':
                correctAnswer = generateQuestion(1, 10); // Zahlen von 1 bis 10
                break;
            case 'mittel':
                correctAnswer = generateQuestion(1, 20); // Zahlen von 1 bis 20
                break;
            case 'schwer':
                correctAnswer = generateQuestion(1, 50); // Zahlen von 1 bis 50
                break;
            default:
                correctAnswer = generateQuestion(1, 10); // Standard: Leicht
        }
    }

    // Starten des Timers
    function startTimer() {
        timerInterval = setInterval(function() {
            timeLeft--;
            var minutes = Math.floor(timeLeft / 60);
            var seconds = timeLeft % 60;
            document.getElementById("timer").textContent = "Verbleibende Zeit: " + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
            if (timeLeft === 0) {
                endGame();
            }
        }, 1000);
    }

    // Funktion zur Generierung einer zufälligen Zahl zwischen min und max
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Funktion zur Generierung einer neuen Aufgabe mit dem angegebenen Zahlenbereich
    function generateQuestion(min, max) {
        var num1 = getRandomNumber(min, max);
        var num2 = getRandomNumber(min, max);
        document.getElementById("question").textContent = "Was ist " + num1 + " + " + num2 + " ?";
        return num1 + num2; // Rückgabe der richtigen Antwort
    }

    // Funktion zur Überprüfung der Antwort
    function checkAnswer() {
        var userAnswer = parseInt(document.getElementById("answer").value);
        if (userAnswer === correctAnswer) {
            score++; // Punktzahl erhöhen
            document.getElementById("result").textContent = "Richtig!";
        } else {
            lives--; // Leben abziehen
            document.getElementById("result").textContent = "Falsch!";
            document.getElementById("lives").textContent = "Leben: " + lives;
            if (lives === 0) {
                endGame();
                return;
            }
        }
        document.getElementById("score").textContent = "Punktzahl: " + score;
        // Neue Aufgabe generieren
        setDifficulty(difficultyLevel); // Schwierigkeitsgrad beibehalten
        // Antwortfeld leeren
        document.getElementById("answer").value = "";
        // Fokus auf das Antwortfeld setzen
        document.getElementById("answer").focus();
    }

    // Funktion zum Beenden des Spiels
    function endGame() {
        clearInterval(timerInterval); // Timer stoppen
        document.getElementById("result").textContent = "Spiel vorbei! Deine Punktzahl: " + score;
        document.getElementById("answer").setAttribute("disabled", "disabled");
        document.getElementById("answer").value = "";
        document.getElementsByTagName("button")[0].setAttribute("disabled", "disabled");
        // Neustartbutton anzeigen
        document.querySelector('.restart-button').style.display = 'block';
    }

    // Funktion zum Neustarten des Spiels
    function restartGame() {
        lives = 3; // Leben zurücksetzen
        score = 0; // Punktzahl zurücksetzen
        timeLeft = 60; // Timer zurücksetzen
        // Texte und Anzeigen zurücksetzen
        document.getElementById("result").textContent = "";
        document.getElementById("score").textContent = "Punktzahl: 0";
        document.getElementById("lives").textContent = "Leben: 3";
        document.getElementById("timer").textContent = "Verbleibende Zeit: 1:00";
        document.getElementById("answer").removeAttribute("disabled");
        document.getElementsByTagName("button")[0].removeAttribute("disabled");
        document.querySelector('.restart-button').style.display = 'none';
        // Zurück zum Startmenü
        document.getElementById('start-menu').style.display = 'block';
        document.getElementById('game-container').style.display = 'none';
    }

    // Funktion zur Überprüfung der Eingabe mit der Enter-Taste
    function checkEnter(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    }
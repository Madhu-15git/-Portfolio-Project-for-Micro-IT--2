document.addEventListener('DOMContentLoaded', () => {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const playerDisplay = document.getElementById('player-display');
    const computerDisplay = document.getElementById('computer-display');
    const gameResult = document.getElementById('game-result');
    const playerScoreSpan = document.getElementById('player-score');
    const computerScoreSpan = document.getElementById('computer-score');
    const resetBtn = document.getElementById('reset-btn');

    let playerScore = 0;
    let computerScore = 0;

    // Function to update scores
    function updateScores(result) {
        if (result === "You win!") {
            playerScore++;
            playerScoreSpan.textContent = playerScore;
        } else if (result === "Computer wins!") {
            computerScore++;
            computerScoreSpan.textContent = computerScore;
        }
    }

    // Event listeners for choice buttons
    choiceButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const playerChoice = button.id; // rock, paper, or scissors

            try {
                const response = await fetch('/play', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ choice: playerChoice }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                playerDisplay.textContent = data.player_choice.charAt(0).toUpperCase() + data.player_choice.slice(1);
                computerDisplay.textContent = data.computer_choice.charAt(0).toUpperCase() + data.computer_choice.slice(1);
                gameResult.textContent = data.result;

                updateScores(data.result);

            } catch (error) {
                console.error('Error during game play:', error);
                gameResult.textContent = 'An error occurred. Please try again.';
            }
        });
    });

    // Event listener for reset button
    resetBtn.addEventListener('click', () => {
        playerScore = 0;
        computerScore = 0;
        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;
        playerDisplay.textContent = '';
        computerDisplay.textContent = '';
        gameResult.textContent = 'Choose your weapon!';
    });
});
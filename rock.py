import random
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Game logic
def determine_winner(player_choice, computer_choice):
    if player_choice == computer_choice:
        return "It's a tie!"
    elif (player_choice == "rock" and computer_choice == "scissors") or \
         (player_choice == "paper" and computer_choice == "rock") or \
         (player_choice == "scissors" and computer_choice == "paper"):
        return "You win!"
    else:
        return "Computer wins!"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play', methods=['POST'])
def play():
    player_choice = request.json['choice']
    computer_choice = random.choice(["rock", "paper", "scissors"])
    result = determine_winner(player_choice, computer_choice)

    response = {
        "player_choice": player_choice,
        "computer_choice": computer_choice,
        "result": result
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('hidden');
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').classList.add('hidden');
});

document.getElementById('rankingButton').addEventListener('click', function() {
    document.getElementById('startContainer').classList.add('hidden');
    document.getElementById('gameContainer').classList.add('hidden');
    
    document.getElementById('scoreContainer').classList.remove('hidden');
});

document.getElementById('goButton').addEventListener('click', function() {
    document.getElementById('startContainer').classList.add('hidden');
    document.getElementById('scoreContainer').classList.add('hidden');
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('gameContainer').classList.remove('hidden');
});
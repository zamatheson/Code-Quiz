document.addEventListener('DOMContentLoaded', function(){
    const lastScoreEl = document.getElementById('lastscore');
    const lastScore = localStorage.getItem('lastscore');

    if (lastscore !== null) {
        lastScoreEl.textContent = `Score: ${lastScore}`;
    }
});
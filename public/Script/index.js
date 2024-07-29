fetch("/api/scores")
.then((response) => response.json())
.then((data) => {
    let scoreHtml = data.sort((a, b) => b.score - a.score).map((s, i) => `
                <tr>
                    <td>${i+1}</td>
                    <td>${s.userName}</td>
                    <td>${s.score}</td>
                </tr>
            `).join('');

    const leaderboardHTML = `
        <table>
            <tr>
                <th>Rank</th>
                <th>User Name</th>
                <th>High Score</th>
            </tr>
            ${scoreHtml}
        </table>
    `

    document.getElementById("scores").innerHTML += leaderboardHTML
})
.catch((error) => {
  console.error("Error:", error);
});
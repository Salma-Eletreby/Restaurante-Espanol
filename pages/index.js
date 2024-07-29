import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Scoreboard</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="../../public/Style/index.css" />
      </Head>
      <header className={styles.header}>
        <div className={styles.headline}>
          <h1 className={styles.mainTitle}>Bienvenido al 'Restaurante Español'!</h1>
          <p className={styles.slogan} style={{ color: 'black' }}>Play a game. Learn Spanish!</p>
          <a href="game.html">
            <button className={styles.btn}>Play the Game</button>
          </a>
          <h5>Can you reach the top of the leaderboard?</h5>
        </div>
      </header>
      <main>
        <div id="leaderboard">
          <h1>Leaderboard</h1>
          <div id="scores"></div>
        </div>
      </main>
      <script src="../../public/Script/index.js"></script>
    </>
  );
}

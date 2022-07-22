import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import { GridItem } from './components/GridItem';
import { levels, calculateImc, Level } from './helpers/imc';
import leftArrowImage from './assets/leftarrow.png';

const App = ()=>{
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShoow, setToShow] = useState<Level | null>(null);

  const handleClick = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Preencha os campos corretamente.")
    }
  }
  const handleBackButton = () =>{
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC significa Índice de Massa Corporal e trata-se de uma medida do peso de cada pessoa, sendo uma relação entre a massa da pessoa e a sua altura ao quadrado.</p>
          
          <input type="number" 
          placeholder='Digite sua altura em cm (Ex.: 1.79)' 
          value={heightField > 0 ? heightField : ''} 
          onChange={e => setHeightField(parseFloat(e.target.value))}
          disabled={toShoow ? true : false}
          />

          <input type="number" 
          placeholder='Digite seu peso em kg' 
          value={weightField > 0 ? weightField : ''} 
          onChange={e => setWeightField(parseFloat(e.target.value))}
          disabled={toShoow ? true : false}
          />

          <button onClick={handleClick} disabled={toShoow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShoow &&
          <div className={styles.grid} >
          {levels.map((item, key)=>(
            <GridItem key={key} item={item}/>
          ))}
    </div>
    }
    {toShoow &&
    <div className={styles.rightBig}>
      <div className={styles.rightArrow} onClick={handleBackButton}>
        <img src={leftArrowImage} alt="" width={25} />
      </div>
      <GridItem item={toShoow}/>      
    </div>
    }
    </div>
    </div>
    </div>

  );
}

export default App;
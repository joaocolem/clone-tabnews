import React from 'react';

function LandingPage() {
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="landing-page">
      <h1>Bem-vindo à nossa página2!</h1>
      <p>Estamos felizes em tê-lo aqui.</p>
      <button>Explorar</button>
    </div>
  );
}

export default LandingPage;

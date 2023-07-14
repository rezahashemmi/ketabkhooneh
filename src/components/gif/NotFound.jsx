const NotFound = () => {
  return (
    <div className='main-container'>
      <h1>متاسفم. کتابی پیدا نشد!</h1>
      <img
        src={require('../../assets/not-found.gif')}
        alt='Loading'
        style={{ height: '300px' }}
      />
    </div>
  );
};

export default NotFound;

import SingleCounter from './SingleCounter';
import useField from './useField';
import useLocalStorage from './useLocalStorage';
import './App.css';

const App = () => {

  // Hallitse localStorage-arvoja
  const [name, setName] = useLocalStorage("name", "");
  const [birthday, setBirthday] = useLocalStorage("birthday", "");
  const [height, setHeight] = useLocalStorage("height", "");

  // Hallitse lomakekenttiä
  // Kutsuu useField-hookia ja luo lomakkeen kentän
  // Tyyppi: suluissa
  // useField palauttaa olion jossa value, onChange, type
  const nameInput = useField('text');
  const birthdayInput = useField('date');
  const heightInput = useField('number');

  // Synkronoi useField-tilat useLocalStorage-arvojen kanssa
  nameInput.value = name;
  nameInput.onChange = (e) => setName(e.target.value);

  birthdayInput.value = birthday;
  birthdayInput.onChange = (e) => setBirthday(e.target.value);

  heightInput.value = height;
  heightInput.onChange = (e) => setHeight(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();       // Estää sivun uudelleenlatauksen
    // Form submission logic here
    // Lähetä kenttien arvot palvelimelle?
    console.log("Form sent:", { name, birthday, height });
  };

  return (
    <>
      <div className='app-container'>
        <SingleCounter />
        <SingleCounter />
        <SingleCounter />
      </div>

      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div>Name: <input {...nameInput}/></div><br/>
          <div>Birthday: <input {...birthdayInput}/></div><br/>
          <div>Height: <input {...heightInput}/></div>
          <button type="submit">Submit</button>
        </form>
        <div>{nameInput.value} {birthdayInput.value} {heightInput.value}</div>
      </div>
    </>
  );
};

export default App;
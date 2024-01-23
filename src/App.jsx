import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./index.css";

const DynamicForm = () => {


  const [formFields, setFormFields] = useState({
    field1: '',
    field2: '',
    field3: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formList, setFormList] = useState([]); // Tableau pour stocker les données de chaque champ
  const [showList, setShowList] = useState(false);

  const handleChange = (fieldName, value) => {
    setFormFields(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const renderCurrentField = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <label>
              Champ 1:
              <input
                type="text"
                value={formFields.field1}
                onChange={e => handleChange('field1', e.target.value)}
              />
            </label>
            <br />
            {formFields.field1 !== '' && (
              <div>
                <button onClick={() => handleSave(1)}>Enregistrer</button>
                <ExampleCheckboxList fieldName="field1" />
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <label>
              Champ 2:
              <input
                type="text"
                value={formFields.field2}
                onChange={e => handleChange('field2', e.target.value)}
              />
            </label>
            <br />
            {formFields.field2 !== '' && (
              <div>
                <button onClick={() => handleSave(2)}>Enregistrer</button>
                <ExampleCheckboxList fieldName="field2" />
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <label>
              Champ 3:
              <input
                type="text"
                value={formFields.field3}
                onChange={e => handleChange('field3', e.target.value)}
              />
            </label>
            <br />
            {formFields.field3 !== '' && (
              <div>
                <button onClick={() => handleSave(3)}>Enregistrer</button>
                <ExampleCheckboxList fieldName="field3" />
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleSave = step => {
    // Ajoutez vos données de champ actuelles au tableau formList
    setFormList(prevList => [...prevList, { ...formFields }]);
    // Passez au champ suivant après l'enregistrement
    setCurrentStep(prevStep => prevStep + 1);
    // Réinitialisez les champs après l'enregistrement
    setFormFields({
      field1: '',
      field2: '',
      field3: '',
    });

    // Vérifiez si tous les enregistrements ont été faits
    if (step === 3) {
      setShowList(true);
    }
  };

  const ExampleCheckboxList = ({ fieldName }) => (
    <div>
      <p>Exemples de réponses :</p>
      <ul>
        {[1, 2, 3].map((index) => (
          <li key={index}>
            Exemple {index} :
            <input
              type="text"
              value={formFields[`Exemple ${index}`] || ''}
              onChange={(e) => handleChange(`Exemple ${index}`, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );


  const handleCheckboxChange = (fieldName) => {
    // Mettez à jour l'état de la case à cocher
    setFormFields((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  return (
    <div>
      {renderCurrentField()}

      {showList && (
        <div>
          {/* Afficher la liste des données du formulaire avec des exemples cochés */}
          <ul>
            {formList.map((formData, index) => (
              <li key={index}>
                <strong>Enregistrement {index + 1}:</strong>
                {Object.entries(formData).map(([key, value]) => (
                  <span key={key}>
                    {key.startsWith('Exemple') && (
                      <label>
                        <input
                          type="checkbox"
                          checked={formFields[key]}
                          onChange={() => handleCheckboxChange(key)}
                        />
                        {value}
                      </label>
                    )}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );


};
const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Image uploaded successfully:', data);
          // Ajoutez ici le code pour gérer la réponse du serveur
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    } else {
      console.warn('Veuillez sélectionner une image.');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}></button>
    </div>
  );
};
const App = () => {

  return (
    <div>

      <br /> <br />
      <div class="container-fluid">
        <p class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/">créér un sondage <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"></a>
            </li><li class="nav-item">
              <a class="nav-link" href="#"></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            
          </ul>
        </div>
      </p>
        
        <div class="row content">
        
          <div class="col-sm-3 sidenav hidden-xs">
            
            <ul class="nav nav-pills nav-stacked">
              <li class="active"><a href="#section1">Dashboard</a></li>
              <li><a href="#section2">théme</a></li>
              <li><a href="#section3"></a></li>
              <li><a href="#section3">Format</a></li>
            </ul> <br />
          </div> <br />


          <div class="  col-sm-9">
            <div class="well">
              <ImageUpload/>
              <h4>Dashboard</h4>
              <p>Some text..</p>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="well">
                  <DynamicForm />

                </div>
              </div>
            </div>




          </div>
        </div>
      </div>
    </div>


  );
};

export default App;

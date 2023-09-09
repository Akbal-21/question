import spacy
import es_core_news_sm
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
# Cargar el modelo de lenguaje de SpaCy en español
nlp = spacy.load("es_core_news_sm")

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hola mundo'

@app.route('/spacy', methods=['POST'])
def spacy_data():
    concept_founds = False
    data = request.json
    print(data)
    test = data["test"]
    oracion = data["answer"]
    if data["case_sensitive"]:
        doc = nlp(oracion)
        concept_to_serch = set(test)
        for token in doc:
            if token.text in concept_to_serch:
                print(token.text)
                concept_founds = True
                break

    if data["exact_match"]:
        doc = nlp(oracion.lower())
        lower_test = [elemento.lower() for elemento in test]
        print(lower_test)
        concept_to_serch = set(lower_test)
        for token in doc:
            if token.text in concept_to_serch:
                print(f'Primer paso {token.text}')
                concept_founds = True
                print(f'Segundo paso {concept_founds}')
                break
    
    response_data = {"its_correct":concept_founds}
    return jsonify(response_data)

def case_sensitive(oracion, test, concept_founds):
    doc = nlp(oracion)
    concept_to_serch = set(test)
    for token in doc:
        if token.text in concept_to_serch:
            print(token.text)
            concept_founds = True
            break
    return concept_founds

def exact_match(oracion, test, concept_founds):
    doc = nlp(oracion.lower())
    lower_test = [elemento.lower() for elemento in test]
    print(lower_test)
    concept_to_serch = set(lower_test)
    for token in doc:
        if token.text in concept_to_serch:
            print(f'Primer paso {token.text}')
            concept_founds = True
            print(f'Segundo paso {concept_founds}')
            break
    return concept_founds

if __name__ == '__main__':
    app.run()

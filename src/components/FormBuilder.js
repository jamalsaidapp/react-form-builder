// src/components/FormBuilder.js
import React, { useState } from 'react';

const fieldTypes = ['conformité', 'Liste des Valeurs', 'Choix Multiple','Champ Text', 'Date', 'Heure', 'Numérique', 'Photo'];

const FormBuilder = () => {
    const [fields, setFields] = useState([]);

    const addField = () => {
        const newField = {
            id: generateUuid(),
            type: 'Champ Text',
            required: true,
            repeated: false,
            args: [],
            conditional: '',
            label: ''
        };
        setFields([...fields, newField]);
    };

    const exportSchema = () => {
        console.log(fields)
        const schema = JSON.stringify(fields, null, 2);
        const blob = new Blob([schema], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'schema.json';
        a.click();
        URL.revokeObjectURL(url);
    };


    const generateUuid = () => {
        return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
            // eslint-disable-next-line no-mixed-operators
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    return (
        <div style={{flexDirection: 'row', width: 600, margin: 'auto'}}>
            {fields.map((field, index) => (
                <div style={{display: 'flex', justifyContent: 'space-between', gap: 10}} key={index}>
                    <label>
                        Type
                        <select
                            value={field.type}
                            onChange={(e) => {
                                const newFields = [...fields];
                                newFields[index].type = e.target.value;
                                setFields(newFields);
                            }}
                        >
                            {fieldTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Label
                        <input
                            type="text"
                            value={field.label}
                            onChange={(e) => {
                                const newFields = [...fields];
                                newFields[index].label = e.target.value;
                                setFields(newFields);
                            }}
                        />
                    </label>
                    <label>
                        Required
                        <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => {
                                const newFields = [...fields];
                                newFields[index].required = e.target.checked;
                                setFields(newFields);
                            }}
                        />

                    </label>
                    {
                        field.type === 'Liste des Valeurs' || field.type === 'Choix Multiple' ? (
                            <label>
                                Liste des Valeurs
                                <textarea
                                    style={{resize: 'none'}}
                                    rows={2}
                                    value={field.args}
                                    onChange={(e) => {
                                        const newFields = [...fields];
                                        newFields[index].args = e.target.value.split(',');
                                        setFields(newFields);
                                    }}

                                />
                            </label>
                        ) : null
                    }
                    {
                        field.type === 'Photo' ? (
                            <label>
                                Repeter:
                                <input type="checkbox" checked={field.repeated} onChange={(e) => {
                                    const newFields = [...fields];
                                    newFields[index].repeated = e.target.checked;
                                    setFields(newFields);
                                }}/>
                            </label>
                        ) : null
                    }

                    <label>
                        Conditional
                        <select
                            value={field.conditional}
                            onChange={(e) => {
                                const newFields = [...fields];
                                newFields[index].conditional = e.target.value;
                                setFields(newFields);
                            }}
                        >
                            <option value="">None</option>
                            {fields.filter(f => f.id !== field.id).map(f => (
                                <option key={f.id} value={f.id}>{f.label || `Field ${f.id}`}</option>
                            ))}
                        </select>
                    </label>


                    <button type="button" onClick={() => {
                        const newFields = [...fields];
                        newFields.splice(index, 1);
                        setFields(newFields);
                    }}>
                        Delete
                    </button>

                    <button type="button" onClick={() => {
                        const newFields = [...fields];
                        newFields.splice(index, 0, {...field, id: generateUuid()});
                        setFields(newFields);
                    }}>
                        Duplicate
                    </button>
                </div>
            ))}
            <button type="button" onClick={addField}>Add Field</button>
            <button type="button" onClick={exportSchema}>Export Schema</button>
        </div>
    );
};

export default FormBuilder;

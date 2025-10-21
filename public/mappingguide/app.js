// FHIR Mapping Wiki - Main Application Logic

// Content data for all pages
const content = {
    intro: {
        title: 'Introduction to FHIR',
        content: `
            <h1>Introduction to FHIR</h1>

            <div class="info-box">
                <strong>What is FHIR?</strong><br>
                FHIR (Fast Healthcare Interoperability Resources) is a standard for exchanging healthcare information electronically.
            </div>

            <h2>Overview</h2>
            <p>FHIR is a next-generation standards framework created by HL7. It combines the best features of HL7's v2, v3, and CDA product lines while leveraging the latest web standards and applying a tight focus on implementability.</p>

            <h2>Key Features</h2>
            <ul>
                <li><strong>RESTful API:</strong> Based on modern web standards (HTTP, JSON, XML)</li>
                <li><strong>Resources:</strong> Modular components representing healthcare concepts</li>
                <li><strong>Extensibility:</strong> Flexible framework that can be adapted to local requirements</li>
                <li><strong>Implementability:</strong> Designed to be easy to implement and use</li>
            </ul>

            <h2>FHIR Resources</h2>
            <p>FHIR defines a set of "resources" that represent granular clinical concepts. Examples include:</p>
            <ul>
                <li>Patient - Demographics and administrative information</li>
                <li>Observation - Measurements and simple assertions</li>
                <li>Condition - Detailed information about conditions, problems, or diagnoses</li>
                <li>Medication - Definition of a medication</li>
                <li>Procedure - An action performed on a patient</li>
            </ul>

            <h2>Data Formats</h2>
            <p>FHIR resources can be represented in multiple formats:</p>
            <ul>
                <li><strong>JSON</strong> - JavaScript Object Notation (most common)</li>
                <li><strong>XML</strong> - eXtensible Markup Language</li>
                <li><strong>RDF</strong> - Resource Description Framework</li>
            </ul>

            <h3>Example FHIR Resource (JSON)</h3>
            <pre><code class="language-json">{
  "resourceType": "Patient",
  "id": "example",
  "name": [{
    "use": "official",
    "family": "Doe",
    "given": ["John", "Robert"]
  }],
  "gender": "male",
  "birthDate": "1974-12-25"
}</code></pre>

            <h2>Learn More</h2>
            <p>Visit the official <a href="https://www.hl7.org/fhir/" target="_blank">FHIR website</a> for complete documentation and specifications.</p>
        `
    },

    'why-mapping': {
        title: 'Why FHIR Mapping?',
        content: `
            <h1>Why FHIR Mapping?</h1>

            <h2>The Challenge</h2>
            <p>Healthcare organizations often need to exchange data between systems that use different data models, formats, and standards. This creates significant interoperability challenges.</p>

            <h2>The Solution: FHIR Mapping</h2>
            <p>FHIR mapping provides a standardized way to transform data from one format to another, enabling seamless data exchange between disparate healthcare systems.</p>

            <h2>Common Use Cases</h2>

            <h3>1. Legacy System Integration</h3>
            <p>Transform data from legacy HL7 v2 or v3 messages into FHIR resources.</p>
            <div class="info-box">
                <strong>Example:</strong> Converting HL7 v2 ADT messages to FHIR Patient and Encounter resources
            </div>

            <h3>2. Custom Data Models</h3>
            <p>Map proprietary or vendor-specific data models to standardized FHIR resources.</p>

            <h3>3. Cross-Border Exchange</h3>
            <p>Transform data between different national or regional FHIR profiles.</p>

            <h3>4. Data Migration</h3>
            <p>Facilitate migration from one EHR system to another while maintaining data integrity.</p>

            <h2>Benefits</h2>
            <ul>
                <li><strong>Standardization:</strong> Use industry-standard approaches for data transformation</li>
                <li><strong>Maintainability:</strong> Document mappings in a clear, declarative format</li>
                <li><strong>Reusability:</strong> Share and reuse mapping definitions across projects</li>
                <li><strong>Validation:</strong> Leverage FHIR's built-in validation capabilities</li>
                <li><strong>Automation:</strong> Enable automated data transformation pipelines</li>
            </ul>

            <h2>Mapping Approaches</h2>

            <h3>StructureMap</h3>
            <p>FHIR's native mapping language that provides a declarative syntax for defining transformations.</p>

            <h3>FHIR Path</h3>
            <p>A path-based navigation and extraction language for FHIR resources.</p>

            <h3>Custom Code</h3>
            <p>Programmatic transformations using FHIR libraries and SDKs.</p>

            <div class="success-box">
                <strong>Best Practice:</strong> Start with StructureMap for declarative mappings, and use custom code only when necessary for complex transformations.
            </div>
        `
    },

    'quick-start': {
        title: 'Quick Start Guide',
        content: `
            <h1>Quick Start Guide</h1>

            <h2>Getting Started with FHIR Mapping</h2>
            <p>This guide will walk you through creating your first FHIR mapping in just a few steps.</p>

            <h2>Prerequisites</h2>
            <ul>
                <li>Basic understanding of FHIR resources</li>
                <li>Familiarity with JSON or XML</li>
                <li>A FHIR server or validation tool (optional but recommended)</li>
            </ul>

            <h2>Step 1: Identify Your Source and Target</h2>
            <p>First, determine what you're mapping FROM and TO:</p>
            <ul>
                <li><strong>Source:</strong> Your input data (e.g., CSV, HL7 v2, custom JSON)</li>
                <li><strong>Target:</strong> The FHIR resource(s) you want to create</li>
            </ul>

            <div class="info-box">
                <strong>Example:</strong> Mapping a simple patient CSV to a FHIR Patient resource
            </div>

            <h2>Step 2: Create Your Mapping Definition</h2>

            <h3>Simple Example: CSV to Patient</h3>
            <p>Source CSV:</p>
            <pre><code>id,first_name,last_name,dob,gender
001,John,Doe,1974-12-25,male</code></pre>

            <p>Target FHIR Patient (JSON):</p>
            <pre><code class="language-json">{
  "resourceType": "Patient",
  "id": "001",
  "name": [{
    "given": ["John"],
    "family": "Doe"
  }],
  "birthDate": "1974-12-25",
  "gender": "male"
}</code></pre>

            <h2>Step 3: Implement the Mapping</h2>

            <h3>Using JavaScript</h3>
            <pre><code class="language-javascript">function mapCSVToPatient(csvRow) {
  return {
    resourceType: "Patient",
    id: csvRow.id,
    name: [{
      given: [csvRow.first_name],
      family: csvRow.last_name
    }],
    birthDate: csvRow.dob,
    gender: csvRow.gender
  };
}</code></pre>

            <h2>Step 4: Validate Your Output</h2>
            <p>Use FHIR validation tools to ensure your mapped resources are valid:</p>
            <ul>
                <li><a href="https://www.hl7.org/fhir/validator/" target="_blank">Official FHIR Validator</a></li>
                <li><a href="https://fhirvalidator.org/" target="_blank">Online FHIR Validator</a></li>
                <li>HAPI FHIR Validator (Java library)</li>
            </ul>

            <h2>Step 5: Test and Iterate</h2>
            <div class="warning-box">
                <strong>Important:</strong> Always test your mappings with real data and edge cases before deploying to production.
            </div>

            <h2>Next Steps</h2>
            <ul>
                <li>Explore <a href="#patient-mapping">Patient Mapping examples</a></li>
                <li>Learn about <a href="#structuremap">StructureMap</a> for declarative mappings</li>
                <li>Review <a href="#validation">validation strategies</a></li>
            </ul>
        `
    },

    resources: {
        title: 'FHIR Resources',
        content: `
            <h1>FHIR Resources</h1>

            <h2>What are FHIR Resources?</h2>
            <p>Resources are the fundamental building blocks of FHIR. Each resource represents a specific healthcare concept with a well-defined structure and meaning.</p>

            <h2>Resource Categories</h2>

            <h3>1. Foundation Resources</h3>
            <table>
                <thead>
                    <tr>
                        <th>Resource</th>
                        <th>Description</th>
                        <th>Common Use</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Patient</td>
                        <td>Demographics and administrative information</td>
                        <td>Identity management, registration</td>
                    </tr>
                    <tr>
                        <td>Practitioner</td>
                        <td>Healthcare professional information</td>
                        <td>Provider directories, care team</td>
                    </tr>
                    <tr>
                        <td>Organization</td>
                        <td>Healthcare organization details</td>
                        <td>Facility management, network</td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td>Physical places and positions</td>
                        <td>Facility management, routing</td>
                    </tr>
                </tbody>
            </table>

            <h3>2. Clinical Resources</h3>
            <table>
                <thead>
                    <tr>
                        <th>Resource</th>
                        <th>Description</th>
                        <th>Common Use</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Observation</td>
                        <td>Measurements and simple assertions</td>
                        <td>Lab results, vital signs</td>
                    </tr>
                    <tr>
                        <td>Condition</td>
                        <td>Problems, diagnoses, concerns</td>
                        <td>Problem lists, diagnosis tracking</td>
                    </tr>
                    <tr>
                        <td>Procedure</td>
                        <td>Actions performed on patients</td>
                        <td>Surgical history, procedures</td>
                    </tr>
                    <tr>
                        <td>Medication</td>
                        <td>Medication definitions</td>
                        <td>Formulary, medication management</td>
                    </tr>
                    <tr>
                        <td>MedicationRequest</td>
                        <td>Prescription or medication order</td>
                        <td>E-prescribing, medication orders</td>
                    </tr>
                </tbody>
            </table>

            <h3>3. Workflow Resources</h3>
            <table>
                <thead>
                    <tr>
                        <th>Resource</th>
                        <th>Description</th>
                        <th>Common Use</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Encounter</td>
                        <td>Interaction between patient and provider</td>
                        <td>Visit tracking, billing</td>
                    </tr>
                    <tr>
                        <td>Appointment</td>
                        <td>Scheduled healthcare event</td>
                        <td>Scheduling, calendar management</td>
                    </tr>
                    <tr>
                        <td>Task</td>
                        <td>Work item or action to be performed</td>
                        <td>Workflow management, orders</td>
                    </tr>
                </tbody>
            </table>

            <h2>Resource Structure</h2>
            <p>Every FHIR resource has a consistent structure:</p>

            <pre><code class="language-json">{
  "resourceType": "ResourceName",
  "id": "unique-identifier",
  "meta": {
    "versionId": "1",
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "text": {
    "status": "generated",
    "div": "<div>Human-readable narrative</div>"
  },
  // Resource-specific data elements
}</code></pre>

            <h2>Common Elements</h2>
            <ul>
                <li><strong>resourceType:</strong> The type of resource (required)</li>
                <li><strong>id:</strong> Logical identifier for the resource</li>
                <li><strong>meta:</strong> Metadata about the resource</li>
                <li><strong>text:</strong> Human-readable narrative</li>
                <li><strong>extension:</strong> Additional content defined by implementations</li>
            </ul>

            <div class="info-box">
                <strong>Tip:</strong> Use the <a href="https://www.hl7.org/fhir/resourcelist.html" target="_blank">official FHIR resource list</a> to explore all available resources and their structures.
            </div>

            <h2>Resource References</h2>
            <p>Resources can reference other resources to create relationships:</p>

            <pre><code class="language-json">{
  "resourceType": "Observation",
  "subject": {
    "reference": "Patient/example",
    "display": "John Doe"
  },
  "performer": [{
    "reference": "Practitioner/example",
    "display": "Dr. Smith"
  }]
}</code></pre>
        `
    },

    'patient-mapping': {
        title: 'Patient Mapping',
        content: `
            <h1>Patient Mapping</h1>

            <h2>Overview</h2>
            <p>The Patient resource is one of the most commonly mapped resources. It contains demographic and administrative information about an individual receiving healthcare services.</p>

            <h2>Patient Resource Structure</h2>
            <pre><code class="language-json">{
  "resourceType": "Patient",
  "id": "example",
  "identifier": [{
    "system": "http://hospital.example.org/patients",
    "value": "12345"
  }],
  "active": true,
  "name": [{
    "use": "official",
    "family": "Doe",
    "given": ["John", "Robert"],
    "prefix": ["Mr."]
  }],
  "telecom": [{
    "system": "phone",
    "value": "+1-555-123-4567",
    "use": "home"
  }, {
    "system": "email",
    "value": "john.doe@example.com"
  }],
  "gender": "male",
  "birthDate": "1974-12-25",
  "address": [{
    "use": "home",
    "line": ["123 Main St", "Apt 4B"],
    "city": "Springfield",
    "state": "IL",
    "postalCode": "62701",
    "country": "USA"
  }]
}</code></pre>

            <h2>Common Mapping Scenarios</h2>

            <h3>Scenario 1: Database to FHIR</h3>
            <p>Source: Relational database table</p>

            <h4>SQL Table Structure</h4>
            <pre><code class="language-sql">CREATE TABLE patients (
  patient_id INT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  date_of_birth DATE,
  gender CHAR(1),
  phone VARCHAR(20),
  email VARCHAR(100)
);</code></pre>

            <h4>Mapping Logic</h4>
            <pre><code class="language-javascript">function mapDatabaseToPatient(dbRow) {
  return {
    resourceType: "Patient",
    id: dbRow.patient_id.toString(),
    identifier: [{
      system: "http://hospital.example.org/patients",
      value: dbRow.patient_id.toString()
    }],
    name: [{
      given: [dbRow.first_name],
      family: dbRow.last_name
    }],
    gender: dbRow.gender === 'M' ? 'male' :
            dbRow.gender === 'F' ? 'female' : 'unknown',
    birthDate: dbRow.date_of_birth,
    telecom: [
      {
        system: "phone",
        value: dbRow.phone
      },
      {
        system: "email",
        value: dbRow.email
      }
    ].filter(t => t.value) // Remove empty values
  };
}</code></pre>

            <h3>Scenario 2: HL7 v2 to FHIR</h3>
            <p>Source: HL7 v2 ADT message (PID segment)</p>

            <h4>Sample HL7 v2 Message</h4>
            <pre><code>PID|1||12345^^^MRN||Doe^John^Robert^Mr.||19741225|M|||123 Main St^^Springfield^IL^62701^USA||555-123-4567||||||</code></pre>

            <h4>Mapping Notes</h4>
            <table>
                <thead>
                    <tr>
                        <th>HL7 v2 Field</th>
                        <th>FHIR Element</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>PID-3</td>
                        <td>identifier</td>
                        <td>Patient identifiers</td>
                    </tr>
                    <tr>
                        <td>PID-5</td>
                        <td>name</td>
                        <td>Patient name components</td>
                    </tr>
                    <tr>
                        <td>PID-7</td>
                        <td>birthDate</td>
                        <td>Date format conversion needed</td>
                    </tr>
                    <tr>
                        <td>PID-8</td>
                        <td>gender</td>
                        <td>Code mapping required</td>
                    </tr>
                    <tr>
                        <td>PID-11</td>
                        <td>address</td>
                        <td>Address components</td>
                    </tr>
                    <tr>
                        <td>PID-13</td>
                        <td>telecom</td>
                        <td>Phone numbers</td>
                    </tr>
                </tbody>
            </table>

            <h2>Best Practices</h2>

            <div class="success-box">
                <h4>Required Elements</h4>
                <p>While FHIR has minimal required elements, consider including:</p>
                <ul>
                    <li>At least one identifier</li>
                    <li>At least one name</li>
                    <li>Gender (if known)</li>
                    <li>Birth date (if known)</li>
                </ul>
            </div>

            <div class="warning-box">
                <h4>Common Pitfalls</h4>
                <ul>
                    <li><strong>Date formats:</strong> Always use YYYY-MM-DD format</li>
                    <li><strong>Gender values:</strong> Must be male, female, other, or unknown</li>
                    <li><strong>Phone numbers:</strong> Include country code when possible</li>
                    <li><strong>Empty arrays:</strong> Remove empty telecom/address arrays</li>
                </ul>
            </div>

            <h2>Validation Checklist</h2>
            <ul>
                <li>✓ resourceType is "Patient"</li>
                <li>✓ Gender uses valid codes</li>
                <li>✓ Birth date format is correct</li>
                <li>✓ Identifiers have both system and value</li>
                <li>✓ Name has at least family or given</li>
                <li>✓ Telecom entries have system and value</li>
            </ul>

            <h2>Complete Example with Extensions</h2>
            <pre><code class="language-json">{
  "resourceType": "Patient",
  "id": "example-extended",
  "extension": [{
    "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
    "extension": [{
      "url": "ombCategory",
      "valueCoding": {
        "system": "urn:oid:2.16.840.1.113883.6.238",
        "code": "2106-3",
        "display": "White"
      }
    }]
  }],
  "identifier": [{
    "use": "official",
    "type": {
      "coding": [{
        "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
        "code": "MR"
      }]
    },
    "system": "http://hospital.example.org/patients",
    "value": "12345"
  }],
  "active": true,
  "name": [{
    "use": "official",
    "family": "Doe",
    "given": ["John", "Robert"]
  }],
  "gender": "male",
  "birthDate": "1974-12-25"
}</code></pre>
        `
    },

    'structuremap': {
        title: 'StructureMap',
        content: `
            <h1>FHIR StructureMap</h1>

            <h2>What is StructureMap?</h2>
            <p>StructureMap is FHIR's native resource for defining transformations between different data structures. It provides a declarative language for specifying how to convert data from one format to another.</p>

            <h2>Why Use StructureMap?</h2>
            <ul>
                <li><strong>Declarative:</strong> Define transformations without writing imperative code</li>
                <li><strong>Standardized:</strong> Use FHIR's official mapping syntax</li>
                <li><strong>Shareable:</strong> Maps can be shared as FHIR resources</li>
                <li><strong>Executable:</strong> Can be executed by FHIR mapping engines</li>
                <li><strong>Documented:</strong> Self-documenting transformation logic</li>
            </ul>

            <h2>Basic Structure</h2>
            <pre><code class="language-json">{
  "resourceType": "StructureMap",
  "id": "example",
  "url": "http://example.org/fhir/StructureMap/example",
  "name": "ExampleMap",
  "status": "draft",
  "structure": [{
    "url": "http://example.org/StructureDefinition/source",
    "mode": "source"
  }, {
    "url": "http://hl7.org/fhir/StructureDefinition/Patient",
    "mode": "target"
  }],
  "group": [{
    "name": "main",
    "typeMode": "none",
    "input": [{
      "name": "source",
      "mode": "source"
    }, {
      "name": "target",
      "mode": "target"
    }],
    "rule": []
  }]
}</code></pre>

            <h2>Mapping Language Syntax</h2>
            <p>StructureMap also has a text-based syntax that's more readable:</p>

            <h3>Simple Example</h3>
            <pre><code>map "http://example.org/fhir/StructureMap/PatientMap" = "PatientMap"

uses "http://example.org/StructureDefinition/SourcePatient" as source
uses "http://hl7.org/fhir/StructureDefinition/Patient" as target

group PatientTransform(source src, target tgt) {
  src.id -> tgt.id;
  src.firstName -> tgt.name.given;
  src.lastName -> tgt.name.family;
  src.dob -> tgt.birthDate;
  src.gender -> tgt.gender;
}</code></pre>

            <h2>Key Concepts</h2>

            <h3>1. Simple Copy</h3>
            <p>Direct copy from source to target:</p>
            <pre><code>src.id -> tgt.id;</code></pre>

            <h3>2. Value Transformation</h3>
            <p>Transform values during mapping:</p>
            <pre><code>src.sex as s where s = 'M' -> tgt.gender = 'male';
src.sex as s where s = 'F' -> tgt.gender = 'female';</code></pre>

            <h3>3. Create New Element</h3>
            <p>Create and populate a new structure:</p>
            <pre><code>src.phoneNumber as ph -> tgt.telecom as tel then {
  ph -> tel.system = 'phone';
  ph -> tel.value = ph;
};</code></pre>

            <h3>4. Conditional Mapping</h3>
            <p>Apply rules based on conditions:</p>
            <pre><code>src.email as e where e.exists() -> tgt.telecom as tel then {
  e -> tel.system = 'email';
  e -> tel.value = e;
};</code></pre>

            <h2>Complete Example: CSV to Patient</h2>

            <h3>Source Data Structure</h3>
            <pre><code>id,firstName,lastName,dob,sex,phone,email
001,John,Doe,1974-12-25,M,555-1234,john@example.com</code></pre>

            <h3>StructureMap</h3>
            <pre><code>map "http://example.org/fhir/StructureMap/CSVToPatient" = "CSVToPatient"

uses "http://example.org/StructureDefinition/CSVPatient" as source
uses "http://hl7.org/fhir/StructureDefinition/Patient" as target

group Main(source src : CSVPatient, target tgt : Patient) {
  // Copy ID
  src.id -> tgt.id;

  // Map name
  src -> tgt.name as name then {
    src.firstName -> name.given;
    src.lastName -> name.family;
  };

  // Map birth date
  src.dob -> tgt.birthDate;

  // Map gender with transformation
  src.sex as s where s = 'M' -> tgt.gender = 'male';
  src.sex as s where s = 'F' -> tgt.gender = 'female';

  // Map phone
  src.phone as p where p.exists() -> tgt.telecom as tel then {
    p -> tel.system = 'phone';
    p -> tel.value = p;
  };

  // Map email
  src.email as e where e.exists() -> tgt.telecom as tel then {
    e -> tel.system = 'email';
    e -> tel.value = e;
  };
}</code></pre>

            <h2>Advanced Features</h2>

            <h3>Nested Groups</h3>
            <p>Break complex mappings into reusable groups:</p>
            <pre><code>group Main(source src, target tgt) {
  src -> tgt.name as name then MapName(src, name);
}

group MapName(source src, target name) {
  src.firstName -> name.given;
  src.lastName -> name.family;
}</code></pre>

            <h3>Dependent Rules</h3>
            <p>Create complex nested structures:</p>
            <pre><code>src.address as addr -> tgt.address as tgtAddr then {
  addr.street -> tgtAddr.line;
  addr.city -> tgtAddr.city;
  addr.state -> tgtAddr.state;
  addr.zip -> tgtAddr.postalCode;
};</code></pre>

            <h2>Execution Engines</h2>
            <p>Several tools can execute StructureMaps:</p>
            <ul>
                <li><strong>HAPI FHIR:</strong> Java-based FHIR server with mapping support</li>
                <li><strong>Firely .NET SDK:</strong> .NET library with StructureMap execution</li>
                <li><strong>Matchbox:</strong> Open-source mapping engine</li>
                <li><strong>FHIR Mapping Language:</strong> Reference implementation</li>
            </ul>

            <div class="info-box">
                <strong>Tool Recommendation:</strong> Start with the <a href="https://hapifhir.io/" target="_blank">HAPI FHIR</a> reference implementation for learning and testing StructureMaps.
            </div>

            <h2>Testing Your Maps</h2>
            <pre><code class="language-javascript">// Using HAPI FHIR StructureMap execution
const structureMapUtilities = new StructureMapUtilities(context);
const map = structureMapUtilities.parse(mapText);

const source = { /* source data */ };
const target = new Patient();

structureMapUtilities.transform(context, source, map, target);

// Validate the result
const validator = context.newValidator();
const result = validator.validate(target);
console.log(result.isSuccessful());</code></pre>

            <h2>Best Practices</h2>
            <div class="success-box">
                <ul>
                    <li>Keep maps focused on single resource transformations</li>
                    <li>Use descriptive names for groups and variables</li>
                    <li>Document complex transformations with comments</li>
                    <li>Test maps with edge cases and missing data</li>
                    <li>Version your StructureMaps like any other FHIR resource</li>
                </ul>
            </div>
        `
    },

    glossary: {
        title: 'Glossary',
        content: `
            <h1>FHIR Mapping Glossary</h1>

            <h2>A</h2>
            <p><strong>API (Application Programming Interface):</strong> A set of protocols for building and integrating application software.</p>

            <h2>B</h2>
            <p><strong>Bundle:</strong> A FHIR resource that contains a collection of other resources, used for grouping related resources together.</p>

            <h2>C</h2>
            <p><strong>CodeableConcept:</strong> A FHIR data type representing a value that can be coded using one or more coding systems.</p>
            <p><strong>Coding:</strong> A representation of a defined concept using a symbol from a defined code system.</p>

            <h2>D</h2>
            <p><strong>Data Type:</strong> A specification of the format and valid values for a piece of data.</p>

            <h2>E</h2>
            <p><strong>EHR (Electronic Health Record):</strong> Digital version of a patient's medical history.</p>
            <p><strong>Extension:</strong> A mechanism to add additional content to FHIR resources beyond the base specification.</p>

            <h2>F</h2>
            <p><strong>FHIR (Fast Healthcare Interoperability Resources):</strong> A standard for exchanging healthcare information electronically.</p>
            <p><strong>FHIRPath:</strong> A path-based navigation and extraction language for FHIR resources.</p>

            <h2>H</h2>
            <p><strong>HL7 (Health Level Seven):</strong> An international standards organization for healthcare information exchange.</p>

            <h2>I</h2>
            <p><strong>Identifier:</strong> A unique reference to a resource or entity.</p>
            <p><strong>Interoperability:</strong> The ability of different systems to exchange and use information.</p>

            <h2>J</h2>
            <p><strong>JSON (JavaScript Object Notation):</strong> A lightweight data-interchange format commonly used with FHIR.</p>

            <h2>M</h2>
            <p><strong>Mapping:</strong> The process of transforming data from one format to another.</p>
            <p><strong>Metadata:</strong> Data that describes other data.</p>

            <h2>P</h2>
            <p><strong>Profile:</strong> A set of constraints on a FHIR resource for a specific use case.</p>

            <h2>R</h2>
            <p><strong>Reference:</strong> A link from one FHIR resource to another.</p>
            <p><strong>Resource:</strong> A fundamental building block of FHIR representing a healthcare concept.</p>
            <p><strong>REST (Representational State Transfer):</strong> An architectural style for web services used by FHIR.</p>

            <h2>S</h2>
            <p><strong>StructureDefinition:</strong> A FHIR resource that defines the structure and constraints for other resources.</p>
            <p><strong>StructureMap:</strong> A FHIR resource for defining transformations between data structures.</p>

            <h2>T</h2>
            <p><strong>Terminology:</strong> The vocabulary and code systems used in healthcare data.</p>

            <h2>V</h2>
            <p><strong>Validation:</strong> The process of checking if data conforms to specified rules and constraints.</p>
            <p><strong>ValueSet:</strong> A selection of codes from one or more code systems for a particular purpose.</p>

            <h2>X</h2>
            <p><strong>XML (eXtensible Markup Language):</strong> A markup language used as an alternative format for FHIR resources.</p>
        `
    },

    'us-core': {
        title: 'US Core Profiles',
        content: `
            <h1>Mapping to US Core Standard</h1>

            <h2>What is US Core?</h2>
            <p>US Core is a set of FHIR profiles that define the minimum conformance requirements for accessing patient data in the United States. It's mandated by the ONC (Office of the National Coordinator for Health IT) for certification and is widely adopted across US healthcare systems.</p>

            <div class="info-box">
                <strong>Why US Core Matters:</strong><br>
                US Core profiles ensure interoperability across different US healthcare systems by defining a common set of data elements and value sets that must be supported.
            </div>

            <h2>Key US Core Profiles</h2>

            <table>
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>Base Resource</th>
                        <th>Key Requirements</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>US Core Patient</td>
                        <td>Patient</td>
                        <td>Identifier, Name, Gender, Birth Date, Address, Phone, Race, Ethnicity</td>
                    </tr>
                    <tr>
                        <td>US Core Observation</td>
                        <td>Observation</td>
                        <td>Status, Category, Code (LOINC), Subject, Effective Date, Value</td>
                    </tr>
                    <tr>
                        <td>US Core Condition</td>
                        <td>Condition</td>
                        <td>Clinical Status, Verification Status, Category, Code (SNOMED CT), Subject</td>
                    </tr>
                    <tr>
                        <td>US Core Medication Request</td>
                        <td>MedicationRequest</td>
                        <td>Status, Intent, Medication (RxNorm), Subject, Authored On</td>
                    </tr>
                    <tr>
                        <td>US Core Procedure</td>
                        <td>Procedure</td>
                        <td>Status, Code (CPT/SNOMED CT), Subject, Performed Date</td>
                    </tr>
                </tbody>
            </table>

            <h2>US Core Patient Example</h2>

            <pre><code class="language-json">{
  "resourceType": "Patient",
  "id": "example",
  "meta": {
    "profile": ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient"]
  },
  "extension": [
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
      "extension": [
        {
          "url": "ombCategory",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "2106-3",
            "display": "White"
          }
        },
        {
          "url": "text",
          "valueString": "White"
        }
      ]
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
      "extension": [
        {
          "url": "ombCategory",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "2186-5",
            "display": "Not Hispanic or Latino"
          }
        },
        {
          "url": "text",
          "valueString": "Not Hispanic or Latino"
        }
      ]
    }
  ],
  "identifier": [
    {
      "use": "usual",
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
            "code": "MR",
            "display": "Medical Record Number"
          }
        ]
      },
      "system": "http://hospital.example.org",
      "value": "12345"
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Doe",
      "given": ["John", "Robert"]
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "555-123-4567",
      "use": "home"
    },
    {
      "system": "email",
      "value": "john.doe@example.com"
    }
  ],
  "gender": "male",
  "birthDate": "1974-12-25",
  "address": [
    {
      "use": "home",
      "line": ["123 Main St"],
      "city": "Springfield",
      "state": "IL",
      "postalCode": "62701",
      "country": "US"
    }
  ]
}</code></pre>

            <h2>Mapping to US Core Requirements</h2>

            <h3>Required Elements</h3>
            <p>When mapping to US Core, ensure you include these required elements:</p>

            <h4>Patient Profile</h4>
            <ul>
                <li><strong>Identifier:</strong> At least one identifier (MRN, SSN, etc.)</li>
                <li><strong>Name:</strong> Official or usual name with family and given names</li>
                <li><strong>Gender:</strong> Administrative gender (male, female, other, unknown)</li>
                <li><strong>Race Extension:</strong> OMB race category (required for US implementations)</li>
                <li><strong>Ethnicity Extension:</strong> OMB ethnicity category</li>
            </ul>

            <h4>Observation Profile</h4>
            <ul>
                <li><strong>Status:</strong> registered | preliminary | final | amended</li>
                <li><strong>Category:</strong> Classification (laboratory, vital-signs, etc.)</li>
                <li><strong>Code:</strong> LOINC code required</li>
                <li><strong>Subject:</strong> Reference to Patient</li>
                <li><strong>Effective[x]:</strong> Date/time of observation</li>
            </ul>

            <h3>Mapping Example: Database to US Core Patient</h3>

            <pre><code class="language-javascript">function mapToUSCorePatient(dbPatient) {
  const patient = {
    resourceType: "Patient",
    meta: {
      profile: ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient"]
    },
    extension: [],
    identifier: [{
      use: "usual",
      type: {
        coding: [{
          system: "http://terminology.hl7.org/CodeSystem/v2-0203",
          code: "MR"
        }]
      },
      system: "http://hospital.example.org",
      value: dbPatient.mrn
    }],
    name: [{
      use: "official",
      family: dbPatient.lastName,
      given: [dbPatient.firstName]
    }],
    gender: dbPatient.gender.toLowerCase(),
    birthDate: dbPatient.dob
  };

  // Add US Core Race Extension
  if (dbPatient.race) {
    patient.extension.push({
      url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
      extension: [
        {
          url: "ombCategory",
          valueCoding: {
            system: "urn:oid:2.16.840.1.113883.6.238",
            code: getRaceCode(dbPatient.race),
            display: dbPatient.race
          }
        },
        {
          url: "text",
          valueString: dbPatient.race
        }
      ]
    });
  }

  // Add US Core Ethnicity Extension
  if (dbPatient.ethnicity) {
    patient.extension.push({
      url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
      extension: [
        {
          url: "ombCategory",
          valueCoding: {
            system: "urn:oid:2.16.840.1.113883.6.238",
            code: getEthnicityCode(dbPatient.ethnicity),
            display: dbPatient.ethnicity
          }
        },
        {
          url: "text",
          valueString: dbPatient.ethnicity
        }
      ]
    });
  }

  return patient;
}

function getRaceCode(race) {
  const raceCodes = {
    "White": "2106-3",
    "Black or African American": "2054-5",
    "Asian": "2028-9",
    "American Indian or Alaska Native": "1002-5",
    "Native Hawaiian or Other Pacific Islander": "2076-8"
  };
  return raceCodes[race] || "2131-1"; // Other Race
}

function getEthnicityCode(ethnicity) {
  return ethnicity.includes("Hispanic") ? "2135-2" : "2186-5";
}</code></pre>

            <h2>Must Support Elements</h2>

            <div class="warning-box">
                <strong>Must Support:</strong> Elements marked as "Must Support" in US Core must be populated if the data is available in the source system. If you don't have the data, the element can be omitted, but if you have it, you must include it.
            </div>

            <h2>Terminology Bindings</h2>

            <table>
                <thead>
                    <tr>
                        <th>Element</th>
                        <th>Required Code System</th>
                        <th>Binding Strength</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Patient.identifier.type</td>
                        <td>IdentifierType</td>
                        <td>Extensible</td>
                    </tr>
                    <tr>
                        <td>Patient.telecom.system</td>
                        <td>ContactPointSystem</td>
                        <td>Required</td>
                    </tr>
                    <tr>
                        <td>Observation.code</td>
                        <td>LOINC</td>
                        <td>Extensible</td>
                    </tr>
                    <tr>
                        <td>Condition.code</td>
                        <td>SNOMED CT</td>
                        <td>Extensible</td>
                    </tr>
                    <tr>
                        <td>MedicationRequest.medication</td>
                        <td>RxNorm</td>
                        <td>Extensible</td>
                    </tr>
                </tbody>
            </table>

            <h2>Validation Against US Core</h2>

            <pre><code class="language-bash"># Using FHIR Validator
java -jar validator_cli.jar patient.json -version 4.0.1 -ig hl7.fhir.us.core

# Using HAPI FHIR Validator API
FhirValidator validator = fhirContext.newValidator();
IValidatorModule module = new FhirInstanceValidator(fhirContext);
validator.registerValidatorModule(module);

ValidationResult result = validator.validateWithResult(patient);
if (result.isSuccessful()) {
  System.out.println("Validation passed!");
} else {
  result.getMessages().forEach(System.out::println);
}</code></pre>

            <h2>Resources</h2>
            <ul>
                <li><a href="http://hl7.org/fhir/us/core/" target="_blank">US Core Implementation Guide</a></li>
                <li><a href="http://hl7.org/fhir/us/core/profiles.html" target="_blank">US Core Profiles List</a></li>
                <li><a href="https://www.healthit.gov/isa/united-states-core-data-interoperability-uscdi" target="_blank">USCDI Data Elements</a></li>
            </ul>
        `
    },

    'yaml-mapping': {
        title: 'YAML Mapping Files',
        content: `
            <h1>YAML Mapping Files</h1>

            <h2>Why Use YAML for FHIR Mapping?</h2>
            <p>YAML (YAML Ain't Markup Language) provides a human-readable, structured format for defining FHIR mappings. It's particularly useful for:</p>

            <ul>
                <li><strong>Configuration-driven mapping:</strong> Define mappings without writing code</li>
                <li><strong>Version control:</strong> Easy to track changes in mapping logic</li>
                <li><strong>Collaboration:</strong> Non-developers can review and update mappings</li>
                <li><strong>Automation:</strong> Generate mapping code from YAML definitions</li>
            </ul>

            <h2>Basic YAML Mapping Structure</h2>

            <pre><code class="language-yaml"># patient-mapping.yaml
mapping:
  name: "Patient Database to FHIR"
  version: "1.0"
  source:
    type: "database"
    table: "patients"
  target:
    resourceType: "Patient"
    profile: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient"

  fields:
    - source: "patient_id"
      target: "id"

    - source: "mrn"
      target: "identifier[0].value"
      transform:
        - type: "identifier"
          system: "http://hospital.example.org"
          use: "usual"

    - source: "first_name"
      target: "name[0].given[0]"

    - source: "last_name"
      target: "name[0].family"

    - source: "dob"
      target: "birthDate"
      transform:
        - type: "date"
          format: "YYYY-MM-DD"

    - source: "gender"
      target: "gender"
      transform:
        - type: "map"
          mappings:
            "M": "male"
            "F": "female"
            "O": "other"
            "U": "unknown"

    - source: "phone"
      target: "telecom[0]"
      transform:
        - type: "telecom"
          system: "phone"
          use: "home"

    - source: "email"
      target: "telecom[1]"
      transform:
        - type: "telecom"
          system: "email"</code></pre>

            <h2>Advanced YAML Mapping Features</h2>

            <h3>Conditional Mapping</h3>

            <pre><code class="language-yaml">fields:
  - source: "ssn"
    target: "identifier[1].value"
    condition:
      - field: "ssn"
        operator: "not_null"
    transform:
      - type: "identifier"
        system: "http://hl7.org/fhir/sid/us-ssn"
        type_code: "SS"</code></pre>

            <h3>Complex Object Mapping</h3>

            <pre><code class="language-yaml">fields:
  - source: ["street", "city", "state", "zip"]
    target: "address[0]"
    transform:
      - type: "address"
        mapping:
          line: ["street"]
          city: "city"
          state: "state"
          postalCode: "zip"
          country: "US"
        use: "home"</code></pre>

            <h3>Reference Mapping</h3>

            <pre><code class="language-yaml">fields:
  - source: "primary_physician_id"
    target: "generalPractitioner[0].reference"
    transform:
      - type: "reference"
        resourceType: "Practitioner"
        prefix: "Practitioner/"</code></pre>

            <h2>Complete Example: Observation Mapping</h2>

            <pre><code class="language-yaml"># observation-mapping.yaml
mapping:
  name: "Lab Result to FHIR Observation"
  version: "1.0"
  source:
    type: "csv"
    file: "lab_results.csv"
  target:
    resourceType: "Observation"
    profile: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-observation-lab"

  fields:
    - source: "result_id"
      target: "id"

    - source: "status"
      target: "status"
      transform:
        - type: "map"
          mappings:
            "FINAL": "final"
            "PRELIM": "preliminary"
            "CORRECTED": "amended"
          default: "final"

    - target: "category[0]"
      static:
        coding:
          - system: "http://terminology.hl7.org/CodeSystem/observation-category"
            code: "laboratory"
            display: "Laboratory"

    - source: "loinc_code"
      target: "code.coding[0]"
      transform:
        - type: "coding"
          system: "http://loinc.org"
          display_field: "loinc_display"

    - source: "patient_id"
      target: "subject.reference"
      transform:
        - type: "reference"
          resourceType: "Patient"
          prefix: "Patient/"

    - source: "performed_date"
      target: "effectiveDateTime"
      transform:
        - type: "datetime"
          format: "YYYY-MM-DD HH:mm:ss"

    - source: "result_value"
      target: "valueQuantity.value"
      transform:
        - type: "decimal"

    - source: "result_unit"
      target: "valueQuantity.unit"

    - source: "result_unit"
      target: "valueQuantity.code"
      transform:
        - type: "lookup"
          table: "ucum_units"

    - target: "valueQuantity.system"
      static: "http://unitsofmeasure.org"</code></pre>

            <h2>Processing YAML Mappings with Python</h2>

            <pre><code class="language-python">import yaml
from fhir.resources.patient import Patient
from fhir.resources.identifier import Identifier
from fhir.resources.humanname import HumanName
from datetime import datetime

def load_mapping(yaml_file):
    """Load YAML mapping definition"""
    with open(yaml_file, 'r') as f:
        return yaml.safe_load(f)

def apply_transform(value, transforms):
    """Apply transformation rules to a value"""
    for transform in transforms:
        if transform['type'] == 'map':
            value = transform['mappings'].get(value, transform.get('default', value))
        elif transform['type'] == 'date':
            value = datetime.strptime(value, '%m/%d/%Y').strftime('%Y-%m-%d')
    return value

def map_data(source_data, mapping_config):
    """Map source data to FHIR resource using YAML config"""
    resource_type = mapping_config['target']['resourceType']
    resource_data = {'resourceType': resource_type}

    for field_mapping in mapping_config['fields']:
        source_field = field_mapping.get('source')
        target_field = field_mapping['target']

        if source_field:
            value = source_data.get(source_field)

            # Apply transformations if defined
            if 'transform' in field_mapping:
                value = apply_transform(value, field_mapping['transform'])

            # Set value in target
            set_nested_value(resource_data, target_field, value)

        elif 'static' in field_mapping:
            set_nested_value(resource_data, target_field, field_mapping['static'])

    return resource_data

def set_nested_value(obj, path, value):
    """Set value at nested path (e.g., 'name[0].family')"""
    parts = path.replace('[', '.').replace(']', '').split('.')

    for i, part in enumerate(parts[:-1]):
        if part.isdigit():
            part = int(part)
            if not isinstance(obj, list):
                obj = []
            while len(obj) <= part:
                obj.append({})
            obj = obj[part]
        else:
            if part not in obj:
                obj[part] = {}
            obj = obj[part]

    final_key = parts[-1]
    if final_key.isdigit():
        obj[int(final_key)] = value
    else:
        obj[final_key] = value

# Usage example
mapping = load_mapping('patient-mapping.yaml')

source_patient = {
    'patient_id': '12345',
    'mrn': 'MRN001',
    'first_name': 'John',
    'last_name': 'Doe',
    'dob': '12/25/1974',
    'gender': 'M',
    'phone': '555-1234'
}

fhir_patient = map_data(source_patient, mapping['mapping'])
print(fhir_patient)</code></pre>

            <h2>YAML Mapping Best Practices</h2>

            <div class="success-box">
                <h4>Best Practices</h4>
                <ul>
                    <li>Use meaningful names for mapping files (e.g., patient-to-uscore.yaml)</li>
                    <li>Version your mapping files and track changes</li>
                    <li>Include metadata (name, version, description)</li>
                    <li>Document complex transformations with comments</li>
                    <li>Use anchors and aliases for reusable definitions</li>
                    <li>Validate YAML syntax before processing</li>
                    <li>Test mappings with edge cases and null values</li>
                </ul>
            </div>

            <h2>YAML Anchors and Aliases</h2>

            <pre><code class="language-yaml"># Define reusable transforms
transforms:
  date_transform: &date_transform
    - type: "date"
      format: "YYYY-MM-DD"

  phone_transform: &phone_transform
    - type: "telecom"
      system: "phone"
      use: "home"

fields:
  - source: "dob"
    target: "birthDate"
    transform: *date_transform

  - source: "admission_date"
    target: "period.start"
    transform: *date_transform

  - source: "home_phone"
    target: "telecom[0]"
    transform: *phone_transform</code></pre>

            <h2>Tools for YAML Mapping</h2>

            <ul>
                <li><strong>PyYAML:</strong> Python library for YAML parsing</li>
                <li><strong>js-yaml:</strong> JavaScript YAML parser</li>
                <li><strong>FHIR Mapper:</strong> Custom tools that process YAML mappings</li>
                <li><strong>Datasonnet:</strong> Data transformation language with YAML support</li>
            </ul>
        `
    },

    'liquid-templates': {
        title: 'Liquid Templates',
        content: `
            <h1>Liquid Mapping Templates</h1>

            <h2>What is Liquid?</h2>
            <p>Liquid is an open-source template language created by Shopify. In FHIR mapping, Liquid templates provide a powerful way to transform data using a simple, readable syntax with:</p>

            <ul>
                <li><strong>Variables:</strong> Access source data dynamically</li>
                <li><strong>Filters:</strong> Transform data inline (date formatting, case conversion, etc.)</li>
                <li><strong>Logic:</strong> Conditional statements and loops</li>
                <li><strong>Safety:</strong> Sandboxed execution prevents unsafe operations</li>
            </ul>

            <div class="info-box">
                <strong>Microsoft FHIR Converter:</strong> Microsoft's FHIR Converter uses Liquid templates extensively for converting HL7 v2, C-CDA, and JSON data to FHIR. It's one of the most popular Liquid-based FHIR mapping tools.
            </div>

            <h2>Basic Liquid Template Structure</h2>

            <pre><code class="language-json">{
  "resourceType": "Patient",
  "id": "{{ ID }}",
  "identifier": [
    {
      "system": "http://hospital.example.org",
      "value": "{{ MRN }}"
    }
  ],
  "name": [
    {
      "use": "official",
      "family": "{{ LastName }}",
      "given": ["{{ FirstName }}"]
    }
  ],
  "gender": "{{ Gender | downcase }}",
  "birthDate": "{{ DOB | format_as_date }}"
}</code></pre>

            <h2>Liquid Filters for FHIR</h2>

            <h3>Built-in Filters</h3>

            <table>
                <thead>
                    <tr>
                        <th>Filter</th>
                        <th>Description</th>
                        <th>Example</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>downcase</td>
                        <td>Convert to lowercase</td>
                        <td>{{ "MALE" | downcase }} → "male"</td>
                    </tr>
                    <tr>
                        <td>upcase</td>
                        <td>Convert to uppercase</td>
                        <td>{{ "male" | upcase }} → "MALE"</td>
                    </tr>
                    <tr>
                        <td>strip</td>
                        <td>Remove whitespace</td>
                        <td>{{ " text " | strip }} → "text"</td>
                    </tr>
                    <tr>
                        <td>replace</td>
                        <td>Replace substring</td>
                        <td>{{ "M" | replace: "M", "male" }}</td>
                    </tr>
                    <tr>
                        <td>default</td>
                        <td>Default value if null</td>
                        <td>{{ name | default: "Unknown" }}</td>
                    </tr>
                    <tr>
                        <td>split</td>
                        <td>Split string into array</td>
                        <td>{{ "a,b,c" | split: "," }}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Custom FHIR Filters</h3>

            <pre><code class="language-liquid">{{ "12/25/1974" | to_date_format: "YYYY-MM-DD" }}
{{ "M" | to_gender }}
{{ "555-1234" | to_phone_format }}
{{ "12345" | to_patient_reference }}
{{ "2054-5" | lookup_code_display: "race" }}</code></pre>

            <h2>Complete Patient Template Example</h2>

            <pre><code class="language-json">{
  "resourceType": "Patient",
  "id": "{{ patientId | generate_uuid }}",
  "meta": {
    "profile": ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient"]
  },
  {% if race %}
  "extension": [
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
      "extension": [
        {
          "url": "ombCategory",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "{{ race | to_race_code }}",
            "display": "{{ race }}"
          }
        },
        {
          "url": "text",
          "valueString": "{{ race }}"
        }
      ]
    }
  ],
  {% endif %}
  "identifier": [
    {
      "use": "usual",
      "type": {
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
          "code": "MR"
        }]
      },
      "system": "http://hospital.example.org",
      "value": "{{ mrn }}"
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "{{ lastName }}",
      "given": [
        "{{ firstName }}"
        {% if middleName %}, "{{ middleName }}"{% endif %}
      ]
    }
  ],
  "telecom": [
    {% if homePhone %}
    {
      "system": "phone",
      "value": "{{ homePhone | format_phone }}",
      "use": "home"
    }{% if mobilePhone or email %},{% endif %}
    {% endif %}
    {% if mobilePhone %}
    {
      "system": "phone",
      "value": "{{ mobilePhone | format_phone }}",
      "use": "mobile"
    }{% if email %},{% endif %}
    {% endif %}
    {% if email %}
    {
      "system": "email",
      "value": "{{ email }}"
    }
    {% endif %}
  ],
  "gender": "{{ gender | downcase | replace: 'm', 'male' | replace: 'f', 'female' }}",
  "birthDate": "{{ birthDate | to_date_format: 'YYYY-MM-DD' }}",
  {% if address %}
  "address": [
    {
      "use": "home",
      "line": ["{{ address.street }}"],
      "city": "{{ address.city }}",
      "state": "{{ address.state }}",
      "postalCode": "{{ address.zip }}",
      "country": "US"
    }
  ]
  {% endif %}
}</code></pre>

            <h2>Observation Template Example</h2>

            <pre><code class="language-json">{
  "resourceType": "Observation",
  "id": "{{ observationId }}",
  "meta": {
    "profile": ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-observation-lab"]
  },
  "status": "{{ status | downcase | default: 'final' }}",
  "category": [
    {
      "coding": [{
        "system": "http://terminology.hl7.org/CodeSystem/observation-category",
        "code": "laboratory",
        "display": "Laboratory"
      }]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "{{ loincCode }}",
        "display": "{{ loincDisplay }}"
      }
    ],
    "text": "{{ testName }}"
  },
  "subject": {
    "reference": "Patient/{{ patientId }}"
  },
  "effectiveDateTime": "{{ effectiveDate | to_datetime }}",
  {% if resultValue %}
  "valueQuantity": {
    "value": {{ resultValue }},
    "unit": "{{ resultUnit }}",
    "system": "http://unitsofmeasure.org",
    "code": "{{ resultUnit | to_ucum_code }}"
  },
  {% endif %}
  {% if interpretation %}
  "interpretation": [
    {
      "coding": [{
        "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
        "code": "{{ interpretation | to_interpretation_code }}",
        "display": "{{ interpretation }}"
      }]
    }
  ],
  {% endif %}
  {% if referenceRange %}
  "referenceRange": [
    {
      "low": {
        "value": {{ referenceRange.low }},
        "unit": "{{ resultUnit }}"
      },
      "high": {
        "value": {{ referenceRange.high }},
        "unit": "{{ resultUnit }}"
      }
    }
  ]
  {% endif %}
}</code></pre>

            <h2>Conditional Logic and Loops</h2>

            <h3>If/Else Statements</h3>

            <pre><code class="language-liquid">{% if maritalStatus == "M" %}
  "maritalStatus": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
      "code": "M",
      "display": "Married"
    }]
  }
{% elsif maritalStatus == "S" %}
  "maritalStatus": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
      "code": "S",
      "display": "Never Married"
    }]
  }
{% endif %}</code></pre>

            <h3>Loops</h3>

            <pre><code class="language-liquid">"identifier": [
  {% for id in identifiers %}
  {
    "system": "{{ id.system }}",
    "value": "{{ id.value }}"
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]</code></pre>

            <h2>Using Microsoft FHIR Converter</h2>

            <h3>Installation</h3>

            <pre><code class="language-bash"># Install FHIR Converter CLI
dotnet tool install -g Microsoft.Health.Fhir.Liquid.Converter.Tool

# Or use Docker
docker pull mcr.microsoft.com/healthcareapis/fhir-converter:latest</code></pre>

            <h3>Convert Data</h3>

            <pre><code class="language-bash"># Convert HL7 v2 to FHIR
fhir-converter convert \
  --template-directory ./templates \
  --root-template ADT_A01 \
  --input-data ./data/adt_message.hl7 \
  --output-data ./output/patient.json

# Convert JSON to FHIR
fhir-converter convert \
  --template-directory ./templates \
  --root-template Patient \
  --input-data ./data/patient.json \
  --output-data ./output/fhir-patient.json</code></pre>

            <h2>Creating Custom Filters</h2>

            <pre><code class="language-python">from liquid import Environment, FileSystemLoader

# Define custom filters
def to_fhir_date(value):
    """Convert date to FHIR format (YYYY-MM-DD)"""
    from datetime import datetime
    try:
        dt = datetime.strptime(value, '%m/%d/%Y')
        return dt.strftime('%Y-%m-%d')
    except:
        return value

def to_gender(value):
    """Map gender codes to FHIR values"""
    mapping = {
        'M': 'male',
        'F': 'female',
        'O': 'other',
        'U': 'unknown'
    }
    return mapping.get(value.upper(), 'unknown')

def to_patient_reference(patient_id):
    """Create Patient reference"""
    return f"Patient/{patient_id}"

# Create environment with custom filters
env = Environment(loader=FileSystemLoader('./templates'))
env.filters['to_fhir_date'] = to_fhir_date
env.filters['to_gender'] = to_gender
env.filters['to_patient_reference'] = to_patient_reference

# Render template
template = env.get_template('patient.liquid')
output = template.render({
    'firstName': 'John',
    'lastName': 'Doe',
    'birthDate': '12/25/1974',
    'gender': 'M'
})

print(output)</code></pre>

            <h2>Best Practices</h2>

            <div class="success-box">
                <ul>
                    <li>Keep templates modular - use includes for reusable components</li>
                    <li>Always handle null/missing values with default filters or conditionals</li>
                    <li>Use descriptive variable names that match source data</li>
                    <li>Comment complex logic within templates</li>
                    <li>Test templates with edge cases (null, empty, malformed data)</li>
                    <li>Version control your templates alongside mapping documentation</li>
                    <li>Validate output against FHIR profiles</li>
                </ul>
            </div>

            <h2>Template Includes</h2>

            <pre><code class="language-liquid">{% comment %} Main Patient Template {% endcomment %}
{
  "resourceType": "Patient",
  "id": "{{ patientId }}",
  {% include 'patient-identifier' %}
  {% include 'patient-name' %}
  {% include 'patient-telecom' %}
  "gender": "{{ gender | to_gender }}",
  "birthDate": "{{ birthDate | to_fhir_date }}"
}

{% comment %} patient-identifier.liquid {% endcomment %}
"identifier": [
  {
    "use": "usual",
    "system": "{{ identifierSystem }}",
    "value": "{{ mrn }}"
  }
],

{% comment %} patient-name.liquid {% endcomment %}
"name": [
  {
    "use": "official",
    "family": "{{ lastName }}",
    "given": ["{{ firstName }}"]
  }
],</code></pre>

            <h2>Resources</h2>
            <ul>
                <li><a href="https://github.com/microsoft/FHIR-Converter" target="_blank">Microsoft FHIR Converter (GitHub)</a></li>
                <li><a href="https://shopify.github.io/liquid/" target="_blank">Liquid Template Language Documentation</a></li>
                <li><a href="https://github.com/jg-rp/liquid" target="_blank">Python Liquid Library</a></li>
            </ul>
        `
    },

    'python-fhir': {
        title: 'Python fhir.resources',
        content: `
            <h1>Python fhir.resources Library</h1>

            <h2>What is fhir.resources?</h2>
            <p>The <code>fhir.resources</code> Python library provides Pydantic-based models for all FHIR resources. It offers type-safe, validated FHIR resource creation and manipulation with excellent IDE support.</p>

            <div class="info-box">
                <strong>Key Benefits:</strong><br>
                - Type safety with Pydantic models<br>
                - Automatic validation<br>
                - IDE autocomplete support<br>
                - Easy JSON serialization/deserialization<br>
                - Supports FHIR R4 and R5
            </div>

            <h2>Installation</h2>

            <pre><code class="language-bash"># Install fhir.resources
pip install fhir.resources

# Or install with specific FHIR version
pip install "fhir.resources[R4]"</code></pre>

            <h2>Basic Usage</h2>

            <pre><code class="language-python">from fhir.resources.patient import Patient
from fhir.resources.humanname import HumanName
from fhir.resources.identifier import Identifier

# Create a patient
patient = Patient(
    id="example",
    identifier=[
        Identifier(
            system="http://hospital.example.org",
            value="12345"
        )
    ],
    name=[
        HumanName(
            use="official",
            family="Doe",
            given=["John", "Robert"]
        )
    ],
    gender="male",
    birthDate="1974-12-25"
)

# Convert to JSON
json_str = patient.json(indent=2)
print(json_str)</code></pre>

            <h2>Complete Mapping Example</h2>

            <pre><code class="language-python">def map_db_patient_to_fhir(db_patient):
    """Map database patient record to FHIR Patient resource"""

    identifiers = [
        Identifier(
            use="usual",
            system="http://hospital.example.org",
            value=db_patient['mrn']
        )
    ]

    gender_map = {
        'M': 'male',
        'F': 'female',
        'O': 'other',
        'U': 'unknown'
    }

    patient = Patient(
        id=str(db_patient['patient_id']),
        identifier=identifiers,
        name=[HumanName(
            use="official",
            family=db_patient['last_name'],
            given=[db_patient['first_name']]
        )],
        gender=gender_map.get(db_patient.get('gender'), 'unknown'),
        birthDate=db_patient['dob']
    )

    return patient

# Usage
db_patient = {
    'patient_id': 123,
    'mrn': 'MRN001',
    'first_name': 'John',
    'last_name': 'Doe',
    'dob': '1974-12-25',
    'gender': 'M'
}

fhir_patient = map_db_patient_to_fhir(db_patient)
print(fhir_patient.json(indent=2))</code></pre>

            <h2>Parsing FHIR JSON</h2>

            <pre><code class="language-python">from fhir.resources.patient import Patient

# Load from JSON string
json_data = '''{"resourceType": "Patient", "name": [{"family": "Doe"}]}'''
patient = Patient.parse_raw(json_data)

# Load from file
patient = Patient.parse_file('patient.json')</code></pre>

            <h2>Resources</h2>
            <ul>
                <li><a href="https://github.com/nazrulworld/fhir.resources" target="_blank">fhir.resources GitHub</a></li>
                <li><a href="https://fhir-resources.readthedocs.io/" target="_blank">Documentation</a></li>
            </ul>
        `
    },

    'fsh': {
        title: 'FSH (FHIR Shorthand)',
        content: `
            <h1>FSH - FHIR Shorthand Language</h1>

            <h2>What is FSH?</h2>
            <p>FHIR Shorthand (FSH) is a domain-specific language for defining FHIR artifacts like profiles, extensions, value sets, and implementation guides.</p>

            <div class="info-box">
                <strong>FSH is NOT a mapping language</strong>, but it's crucial for:
                <ul>
                    <li>Defining custom profiles for your mappings to target</li>
                    <li>Creating extensions for data not in base FHIR</li>
                    <li>Building implementation guides</li>
                    <li>Defining terminology and value sets</li>
                </ul>
            </div>

            <h2>Installation</h2>

            <pre><code class="language-bash"># Install SUSHI (FSH compiler)
npm install -g fsh-sushi

# Verify installation
sushi --version</code></pre>

            <h2>Basic FSH Syntax</h2>

            <pre><code class="language-fsh">Profile: USCorePatientProfile
Parent: Patient
Id: us-core-patient
Title: "US Core Patient Profile"
Description: "Defines constraints and extensions on Patient for US Core"

* identifier 1..* MS
* identifier.system 1..1 MS
* identifier.value 1..1 MS
* name 1..* MS
* name.family 1..1 MS
* gender 1..1 MS
* birthDate MS</code></pre>

            <h2>Creating Extensions</h2>

            <pre><code class="language-fsh">Extension: Race
Id: us-core-race
Title: "US Core Race Extension"
Description: "Race classification"
* extension contains
    ombCategory 0..5 MS and
    text 1..1 MS
* extension[ombCategory].value[x] only Coding
* extension[text].value[x] only string</code></pre>

            <h2>Defining Value Sets</h2>

            <pre><code class="language-fsh">ValueSet: GenderIdentityValueSet
Id: gender-identity
Title: "Gender Identity Value Set"
Description: "Values for gender identity"
* ^status = #active
* include codes from system http://terminology.hl7.org/CodeSystem/v3-NullFlavor</code></pre>

            <h2>Mapping Documentation</h2>

            <pre><code class="language-fsh">Mapping: SourceToFHIR
Source: SourcePatientModel
Target: "http://hl7.org/fhir/StructureDefinition/Patient"
Id: source-patient-mapping
Title: "Source System to FHIR Patient Mapping"

* -> "Patient" "Maps source patient to FHIR Patient"
* patient_id -> "Patient.id"
* mrn -> "Patient.identifier.value"
* first_name -> "Patient.name.given"
* last_name -> "Patient.name.family"</code></pre>

            <h2>Resources</h2>
            <ul>
                <li><a href="https://fshschool.org/" target="_blank">FSH School (Interactive Tutorial)</a></li>
                <li><a href="https://build.fhir.org/ig/HL7/fhir-shorthand/" target="_blank">FSH Specification</a></li>
                <li><a href="https://github.com/FHIR/sushi" target="_blank">SUSHI GitHub Repository</a></li>
            </ul>
        `
    },

    'complex-scenarios': {
        title: 'Complex Data Scenarios',
        content: `
            <h1>Complex Data Scenarios</h1>

            <h2>Overview</h2>
            <p>Real-world FHIR mapping often involves complex scenarios that go beyond simple field-to-field mappings. This guide covers advanced patterns and solutions.</p>

            <h2>Scenario 1: Multiple Source Records to Single FHIR Resource</h2>

            <h3>Problem</h3>
            <p>Patient data is split across multiple database tables (demographics, contact info, insurance).</p>

            <h3>Solution</h3>

            <pre><code class="language-python">from fhir.resources.patient import Patient
from fhir.resources.coverage import Coverage

def map_patient_from_multiple_sources(demographics, contacts, insurances):
    """Combine data from multiple sources into one Patient resource"""

    # Build patient from demographics table
    patient = Patient(
        id=str(demographics['patient_id']),
        name=[{
            "family": demographics['last_name'],
            "given": [demographics['first_name']]
        }],
        gender=demographics['gender'].lower(),
        birthDate=demographics['dob']
    )

    # Add contact information from contacts table
    if contacts:
        patient.telecom = []
        for contact in contacts:
            if contact['type'] == 'phone':
                patient.telecom.append({
                    "system": "phone",
                    "value": contact['value'],
                    "use": contact['use']
                })
            elif contact['type'] == 'email':
                patient.telecom.append({
                    "system": "email",
                    "value": contact['value']
                })

    return patient</code></pre>

            <h2>Scenario 2: One Source Record to Multiple FHIR Resources</h2>

            <h3>Problem</h3>
            <p>A single lab order record needs to create multiple FHIR resources (ServiceRequest + multiple Observations).</p>

            <h3>Solution</h3>

            <pre><code class="language-python">from fhir.resources.servicerequest import ServiceRequest
from fhir.resources.observation import Observation
from fhir.resources.bundle import Bundle, BundleEntry

def map_lab_order_to_bundle(lab_order, results):
    """Create multiple resources from single source record"""

    entries = []

    # Create ServiceRequest
    service_request = ServiceRequest(
        id=f"sr-{lab_order['order_id']}",
        status="completed",
        intent="order",
        code={"coding": [{
            "system": "http://loinc.org",
            "code": lab_order['panel_code']
        }]},
        subject={"reference": f"Patient/{lab_order['patient_id']}"}
    )

    entries.append(BundleEntry(
        resource=service_request,
        request={"method": "POST", "url": "ServiceRequest"}
    ))

    # Create Observation for each result in the panel
    for result in results:
        observation = Observation(
            id=f"obs-{result['result_id']}",
            status="final",
            code={"coding": [{
                "system": "http://loinc.org",
                "code": result['loinc_code']
            }]},
            subject={"reference": f"Patient/{lab_order['patient_id']}"},
            basedOn=[{"reference": f"ServiceRequest/sr-{lab_order['order_id']}"}],
            valueQuantity={
                "value": result['value'],
                "unit": result['unit']
            }
        )

        entries.append(BundleEntry(
            resource=observation,
            request={"method": "POST", "url": "Observation"}
        ))

    # Create transaction bundle
    bundle = Bundle(
        type="transaction",
        entry=entries
    )

    return bundle</code></pre>

            <h2>Scenario 3: Denormalized Data with Repeating Groups</h2>

            <h3>Problem</h3>
            <p>CSV file with repeating medication columns (med1, med2, med3...).</p>

            <h3>Solution</h3>

            <pre><code class="language-python">def map_medications_from_csv(csv_row):
    """Handle denormalized repeating medication data"""

    medications = []

    # Extract all medication columns dynamically
    for i in range(1, 10):  # Assuming max 10 medications
        med_col = f"medication_{i}"
        dose_col = f"dose_{i}"

        if csv_row.get(med_col):
            medication = MedicationRequest(
                status="active",
                intent="order",
                medicationCodeableConcept={
                    "text": csv_row[med_col]
                },
                subject={"reference": f"Patient/{csv_row['patient_id']}"},
                dosageInstruction=[{
                    "text": csv_row.get(dose_col, "As directed")
                }]
            )
            medications.append(medication)

    return medications</code></pre>

            <h2>Scenario 4: Hierarchical/Nested Data</h2>

            <h3>Problem</h3>
            <p>Source data has nested structures (e.g., orders with line items).</p>

            <h3>Solution</h3>

            <pre><code class="language-python">def map_nested_encounter(encounter_json):
    """Map nested JSON structure to FHIR Encounter"""

    from fhir.resources.encounter import Encounter, EncounterParticipant

    encounter = Encounter(
        id=encounter_json['visit_id'],
        status="finished",
        class_={"code": encounter_json['type']},
        subject={"reference": f"Patient/{encounter_json['patient_id']}"},
        period={
            "start": encounter_json['admission_date'],
            "end": encounter_json['discharge_date']
        }
    )

    # Map nested participants
    if 'care_team' in encounter_json:
        encounter.participant = []
        for provider in encounter_json['care_team']:
            encounter.participant.append(
                EncounterParticipant(
                    type=[{"coding": [{
                        "code": provider['role']
                    }]}],
                    individual={"reference": f"Practitioner/{provider['id']}"}
                )
            )

    # Map nested diagnoses
    if 'diagnoses' in encounter_json:
        encounter.diagnosis = []
        for diag in encounter_json['diagnoses']:
            encounter.diagnosis.append({
                "condition": {"reference": f"Condition/{diag['id']}"},
                "rank": diag.get('rank', 1)
            })

    return encounter</code></pre>

            <h2>Scenario 5: Data Aggregation</h2>

            <h3>Problem</h3>
            <p>Need to aggregate multiple source records into summary observations.</p>

            <h3>Solution</h3>

            <pre><code class="language-python">def create_average_blood_pressure(readings):
    """Aggregate multiple BP readings into summary Observation"""

    systolic_values = [r['systolic'] for r in readings]
    diastolic_values = [r['diastolic'] for r in readings]

    avg_systolic = sum(systolic_values) / len(systolic_values)
    avg_diastolic = sum(diastolic_values) / len(diastolic_values)

    observation = Observation(
        status="final",
        code={"coding": [{
            "system": "http://loinc.org",
            "code": "85354-9",
            "display": "Blood pressure panel"
        }]},
        component=[
            {
                "code": {"coding": [{
                    "system": "http://loinc.org",
                    "code": "8480-6",
                    "display": "Systolic blood pressure"
                }]},
                "valueQuantity": {
                    "value": round(avg_systolic, 1),
                    "unit": "mmHg"
                }
            },
            {
                "code": {"coding": [{
                    "system": "http://loinc.org",
                    "code": "8462-4",
                    "display": "Diastolic blood pressure"
                }]},
                "valueQuantity": {
                    "value": round(avg_diastolic, 1),
                    "unit": "mmHg"
                }
            }
        ],
        note=[{
            "text": f"Average of {len(readings)} readings"
        }]
    )

    return observation</code></pre>

            <h2>Scenario 6: Conditional Resource Creation</h2>

            <h3>Problem</h3>
            <p>Only create certain resources if specific conditions are met.</p>

            <h3>Solution</h3>

            <pre><code class="language-python">def map_patient_with_conditions(patient_data):
    """Conditionally create related resources"""

    resources = []

    # Always create Patient
    patient = Patient(
        id=patient_data['id'],
        name=[{"family": patient_data['name']}]
    )
    resources.append(patient)

    # Only create Allergy if allergies exist
    if patient_data.get('allergies'):
        for allergy in patient_data['allergies']:
            allergy_intolerance = AllergyIntolerance(
                patient={"reference": f"Patient/{patient_data['id']}"},
                code={"text": allergy}
            )
            resources.append(allergy_intolerance)

    # Only create smoking status Observation if data exists
    if patient_data.get('smoking_status'):
        smoking_obs = Observation(
            status="final",
            code={"coding": [{
                "system": "http://loinc.org",
                "code": "72166-2"
            }]},
            valueCodeableConcept={"text": patient_data['smoking_status']},
            subject={"reference": f"Patient/{patient_data['id']}"}
        )
        resources.append(smoking_obs)

    return resources</code></pre>

            <h2>Best Practices</h2>

            <div class="success-box">
                <ul>
                    <li>Use transaction Bundles for atomic multi-resource operations</li>
                    <li>Maintain referential integrity between related resources</li>
                    <li>Handle missing/null data gracefully</li>
                    <li>Document complex mapping logic thoroughly</li>
                    <li>Use contained resources sparingly - prefer references</li>
                    <li>Implement proper error handling and logging</li>
                    <li>Test edge cases and boundary conditions</li>
                </ul>
            </div>
        `
    },

    'source-target-validation': {
        title: 'Source to Target Validation',
        content: `
            <h1>Source to Target Validation</h1>

            <h2>Why Validate?</h2>
            <p>Validating data from source to target ensures:</p>
            <ul>
                <li>Data integrity is maintained during transformation</li>
                <li>No data loss occurs in the mapping process</li>
                <li>Mapped resources conform to FHIR specifications</li>
                <li>Business rules are correctly applied</li>
            </ul>

            <h2>Validation Levels</h2>

            <h3>Level 1: Source Data Validation</h3>
            <p>Validate source data before mapping:</p>

            <pre><code class="language-python">def validate_source_patient(source_data):
    """Validate source data before mapping"""
    errors = []

    # Required fields
    if not source_data.get('mrn'):
        errors.append("Missing required field: MRN")

    if not source_data.get('last_name'):
        errors.append("Missing required field: last_name")

    # Data format validation
    if source_data.get('dob'):
        try:
            datetime.strptime(source_data['dob'], '%Y-%m-%d')
        except ValueError:
            errors.append(f"Invalid date format for dob: {source_data['dob']}")

    # Value validation
    valid_genders = ['M', 'F', 'O', 'U']
    if source_data.get('gender') and source_data['gender'] not in valid_genders:
        errors.append(f"Invalid gender value: {source_data['gender']}")

    return errors</code></pre>

            <h3>Level 2: FHIR Structure Validation</h3>
            <p>Validate FHIR resource structure:</p>

            <pre><code class="language-python">from fhir.resources.patient import Patient
from pydantic import ValidationError

def validate_fhir_structure(patient_dict):
    """Validate FHIR resource structure"""
    try:
        patient = Patient.parse_obj(patient_dict)
        return True, []
    except ValidationError as e:
        errors = []
        for error in e.errors():
            field = '.'.join(str(x) for x in error['loc'])
            errors.append(f"{field}: {error['msg']}")
        return False, errors</code></pre>

            <h3>Level 3: Profile Validation</h3>
            <p>Validate against specific FHIR profiles (e.g., US Core):</p>

            <pre><code class="language-bash"># Using FHIR Validator CLI
java -jar validator_cli.jar patient.json \\
  -version 4.0.1 \\
  -ig hl7.fhir.us.core \\
  -profile http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient</code></pre>

            <pre><code class="language-python"># Using HAPI FHIR in Python via Py4J
from fhir_validator import FHIRValidator

validator = FHIRValidator()
validator.load_profile("http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient")

result = validator.validate(patient_json)
if not result.is_valid:
    for issue in result.issues:
        print(f"{issue.severity}: {issue.message}")</code></pre>

            <h2>Data Completeness Validation</h2>

            <pre><code class="language-python">def validate_data_completeness(source_data, fhir_resource):
    """Ensure no data loss during mapping"""
    issues = []

    # Check all source fields were considered
    mapped_fields = {
        'mrn': fhir_resource.identifier[0].value if fhir_resource.identifier else None,
        'first_name': fhir_resource.name[0].given[0] if fhir_resource.name else None,
        'last_name': fhir_resource.name[0].family if fhir_resource.name else None,
        'dob': fhir_resource.birthDate,
        'gender': fhir_resource.gender
    }

    for field, source_value in source_data.items():
        if source_value and not mapped_fields.get(field):
            issues.append(f"Source field '{field}' with value '{source_value}' was not mapped")

    return issues</code></pre>

            <h2>Business Rule Validation</h2>

            <pre><code class="language-python">def validate_business_rules(patient):
    """Validate business-specific rules"""
    errors = []

    # Rule: Patient must be at least 18 years old
    if patient.birthDate:
        from datetime import date
        birth_date = date.fromisoformat(patient.birthDate)
        age = (date.today() - birth_date).days / 365.25
        if age < 18:
            errors.append(f"Patient must be 18 or older (age: {age:.1f})")

    # Rule: Active patients must have contact information
    if patient.active and not patient.telecom:
        errors.append("Active patients must have at least one contact method")

    # Rule: MRN format validation
    if patient.identifier:
        for identifier in patient.identifier:
            if identifier.type and identifier.type.coding:
                if identifier.type.coding[0].code == "MR":
                    if not identifier.value.startswith("MRN"):
                        errors.append("MRN must start with 'MRN' prefix")

    return errors</code></pre>

            <h2>Comprehensive Validation Framework</h2>

            <pre><code class="language-python">from dataclasses import dataclass
from typing import List
from enum import Enum

class ValidationSeverity(Enum):
    ERROR = "error"
    WARNING = "warning"
    INFO = "info"

@dataclass
class ValidationIssue:
    severity: ValidationSeverity
    field: str
    message: str
    source_value: any = None
    target_value: any = None

class MappingValidator:
    def __init__(self):
        self.issues = []

    def validate_all(self, source_data, fhir_resource):
        """Run all validation checks"""
        self.issues = []

        # Source validation
        self._validate_source(source_data)

        # Structure validation
        self._validate_structure(fhir_resource)

        # Completeness validation
        self._validate_completeness(source_data, fhir_resource)

        # Business rules
        self._validate_business_rules(fhir_resource)

        return self.issues

    def _validate_source(self, source_data):
        if not source_data.get('mrn'):
            self.issues.append(ValidationIssue(
                severity=ValidationSeverity.ERROR,
                field="mrn",
                message="Required field missing"
            ))

    def _validate_structure(self, fhir_resource):
        # Use fhir.resources validation
        try:
            fhir_resource.json()  # This will trigger validation
        except Exception as e:
            self.issues.append(ValidationIssue(
                severity=ValidationSeverity.ERROR,
                field="resource",
                message=str(e)
            ))

    def _validate_completeness(self, source_data, fhir_resource):
        # Check for unmapped data
        if source_data.get('middle_name') and not (
            fhir_resource.name and len(fhir_resource.name[0].given) > 1
        ):
            self.issues.append(ValidationIssue(
                severity=ValidationSeverity.WARNING,
                field="middle_name",
                message="Middle name not mapped",
                source_value=source_data.get('middle_name')
            ))

    def _validate_business_rules(self, fhir_resource):
        # Custom business logic
        pass

    def has_errors(self):
        return any(i.severity == ValidationSeverity.ERROR for i in self.issues)

    def get_report(self):
        """Generate validation report"""
        report = {
            'total_issues': len(self.issues),
            'errors': len([i for i in self.issues if i.severity == ValidationSeverity.ERROR]),
            'warnings': len([i for i in self.issues if i.severity == ValidationSeverity.WARNING]),
            'issues': []
        }

        for issue in self.issues:
            report['issues'].append({
                'severity': issue.severity.value,
                'field': issue.field,
                'message': issue.message,
                'source_value': issue.source_value,
                'target_value': issue.target_value
            })

        return report

# Usage
validator = MappingValidator()
issues = validator.validate_all(source_data, fhir_patient)

if validator.has_errors():
    print("Validation failed!")
    print(json.dumps(validator.get_report(), indent=2))
else:
    print("Validation passed!")
</code></pre>

            <h2>Automated Testing</h2>

            <pre><code class="language-python">import pytest

def test_patient_mapping_completeness():
    """Test that all source fields are mapped"""
    source = {
        'mrn': 'MRN001',
        'first_name': 'John',
        'last_name': 'Doe',
        'dob': '1974-12-25',
        'gender': 'M'
    }

    patient = map_to_fhir_patient(source)

    assert patient.identifier[0].value == source['mrn']
    assert patient.name[0].given[0] == source['first_name']
    assert patient.name[0].family == source['last_name']
    assert patient.birthDate == source['dob']
    assert patient.gender == 'male'

def test_invalid_source_data():
    """Test handling of invalid source data"""
    source = {
        'mrn': '',  # Invalid - empty
        'dob': 'invalid-date'  # Invalid format
    }

    with pytest.raises(ValidationError):
        map_to_fhir_patient(source)</code></pre>

            <h2>Best Practices</h2>

            <div class="success-box">
                <ul>
                    <li>Validate at multiple levels (source, structure, profile, business)</li>
                    <li>Log all validation issues for audit trails</li>
                    <li>Use severity levels (error, warning, info)</li>
                    <li>Automate validation in CI/CD pipelines</li>
                    <li>Keep validation rules separate from mapping logic</li>
                    <li>Test with real-world data samples</li>
                    <li>Document validation rules clearly</li>
                </ul>
            </div>
        `
    },

    'observation-mapping': {
        title: 'Observation Mapping',
        content: `
            <h1>Observation Mapping</h1>

            <h2>Overview</h2>
            <p>The Observation resource is used for measurements, findings, and simple assertions made about a patient. Common uses include lab results, vital signs, and social history observations.</p>

            <h2>Mapping Lab Results</h2>

            <pre><code class="language-python">from fhir.resources.observation import Observation

def map_lab_result_to_observation(lab_result):
    """Map lab result to FHIR Observation"""

    observation = Observation(
        id=str(lab_result['result_id']),
        status="final",
        category=[{
            "coding": [{
                "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                "code": "laboratory"
            }]
        }],
        code={
            "coding": [{
                "system": "http://loinc.org",
                "code": lab_result['loinc_code'],
                "display": lab_result['test_name']
            }]
        },
        subject={"reference": f"Patient/{lab_result['patient_id']}"},
        effectiveDateTime=lab_result['performed_date'],
        valueQuantity={
            "value": float(lab_result['result_value']),
            "unit": lab_result['result_unit']
        }
    )

    return observation</code></pre>

            <h2>Resources</h2>
            <ul>
                <li><a href="http://hl7.org/fhir/observation.html" target="_blank">FHIR Observation Specification</a></li>
            </ul>
        `
    },

    'condition-mapping': {
        title: 'Condition Mapping',
        content: `
            <h1>Condition Mapping</h1>

            <h2>Overview</h2>
            <p>The Condition resource represents a clinical condition, problem, diagnosis, or other event that has risen to a level of concern.</p>

            <h2>Mapping Diagnoses</h2>

            <pre><code class="language-python">from fhir.resources.condition import Condition

def map_diagnosis_to_condition(diagnosis):
    """Map diagnosis to FHIR Condition"""

    condition = Condition(
        id=str(diagnosis['diagnosis_id']),
        clinicalStatus={
            "coding": [{
                "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                "code": "active" if diagnosis['status'] == 'Active' else "inactive"
            }]
        },
        code={
            "coding": [{
                "system": "http://hl7.org/fhir/sid/icd-10",
                "code": diagnosis['icd10_code'],
                "display": diagnosis['diagnosis_name']
            }]
        },
        subject={"reference": f"Patient/{diagnosis['patient_id']}"},
        onsetDateTime=diagnosis.get('onset_date')
    )

    return condition</code></pre>

            <h2>Resources</h2>
            <ul>
                <li><a href="http://hl7.org/fhir/condition.html" target="_blank">FHIR Condition Specification</a></li>
            </ul>
        `
    },

    'medication-mapping': {
        title: 'Medication Mapping',
        content: `
            <h1>Medication Mapping</h1>

            <h2>Overview</h2>
            <p>Medication-related resources in FHIR include MedicationRequest (prescriptions/orders), MedicationStatement (patient-reported), and MedicationAdministration (actual administration).</p>

            <h2>Mapping Prescriptions</h2>

            <pre><code class="language-python">from fhir.resources.medicationrequest import MedicationRequest

def map_prescription_to_medication_request(prescription):
    """Map prescription to FHIR MedicationRequest"""

    med_request = MedicationRequest(
        id=str(prescription['rx_id']),
        status="active",
        intent="order",
        medicationCodeableConcept={
            "coding": [{
                "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
                "code": prescription['rxnorm_code'],
                "display": prescription['medication_name']
            }]
        },
        subject={"reference": f"Patient/{prescription['patient_id']}"},
        authoredOn=prescription['prescribed_date'],
        dosageInstruction=[{"text": prescription['directions']}]
    )

    return med_request</code></pre>

            <h2>Resources</h2>
            <ul>
                <li><a href="http://hl7.org/fhir/medicationrequest.html" target="_blank">FHIR MedicationRequest</a></li>
            </ul>
        `
    },

    'data-types': {
        title: 'FHIR Data Types',
        content: `
            <h1>FHIR Data Types</h1>

            <h2>Overview</h2>
            <p>FHIR defines a rich set of data types that are used across all resources. Understanding these types is crucial for proper data mapping.</p>

            <h2>Primitive Data Types</h2>

            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Example</th>
                        <th>Regex/Format</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>boolean</td>
                        <td>True or false</td>
                        <td>true, false</td>
                        <td>true | false</td>
                    </tr>
                    <tr>
                        <td>integer</td>
                        <td>Whole number</td>
                        <td>42, -7</td>
                        <td>-?[0-9]+</td>
                    </tr>
                    <tr>
                        <td>string</td>
                        <td>Sequence of Unicode characters</td>
                        <td>"Hello World"</td>
                        <td>Any UTF-8 string</td>
                    </tr>
                    <tr>
                        <td>decimal</td>
                        <td>Rational number</td>
                        <td>3.14, -0.5</td>
                        <td>-?([0-9]+\.[0-9]+)</td>
                    </tr>
                    <tr>
                        <td>uri</td>
                        <td>Uniform Resource Identifier</td>
                        <td>"http://example.org"</td>
                        <td>\\S+</td>
                    </tr>
                    <tr>
                        <td>date</td>
                        <td>Date (no time)</td>
                        <td>"2024-01-15"</td>
                        <td>YYYY-MM-DD</td>
                    </tr>
                    <tr>
                        <td>dateTime</td>
                        <td>Date and time</td>
                        <td>"2024-01-15T10:30:00Z"</td>
                        <td>YYYY-MM-DDThh:mm:ss+zz:zz</td>
                    </tr>
                    <tr>
                        <td>time</td>
                        <td>Time of day</td>
                        <td>"10:30:00"</td>
                        <td>hh:mm:ss</td>
                    </tr>
                    <tr>
                        <td>code</td>
                        <td>String from controlled vocabulary</td>
                        <td>"male"</td>
                        <td>[^\\s]+</td>
                    </tr>
                    <tr>
                        <td>id</td>
                        <td>Logical id</td>
                        <td>"example-123"</td>
                        <td>[A-Za-z0-9\\-\\.]{1,64}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Complex Data Types</h2>

            <h3>CodeableConcept</h3>
            <p>A value that is usually supplied by providing a reference to one or more terminologies.</p>

            <pre><code class="language-json">{
  "coding": [{
    "system": "http://snomed.info/sct",
    "code": "44054006",
    "display": "Diabetes mellitus type 2"
  }],
  "text": "Type 2 Diabetes"
}</code></pre>

            <h3>Coding</h3>
            <p>A reference to a code defined by a terminology system.</p>

            <pre><code class="language-json">{
  "system": "http://loinc.org",
  "code": "15074-8",
  "display": "Glucose [Moles/volume] in Blood"
}</code></pre>

            <h3>Identifier</h3>
            <p>A unique identifier for a resource or element.</p>

            <pre><code class="language-json">{
  "use": "official",
  "type": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
      "code": "MR"
    }]
  },
  "system": "http://hospital.example.org",
  "value": "12345"
}</code></pre>

            <h3>HumanName</h3>
            <p>A name of a person.</p>

            <pre><code class="language-json">{
  "use": "official",
  "family": "Doe",
  "given": ["John", "Robert"],
  "prefix": ["Mr."],
  "suffix": ["Jr."]
}</code></pre>

            <h3>Address</h3>
            <p>Physical location.</p>

            <pre><code class="language-json">{
  "use": "home",
  "type": "physical",
  "line": ["123 Main St", "Apt 4B"],
  "city": "Springfield",
  "state": "IL",
  "postalCode": "62701",
  "country": "US"
}</code></pre>

            <h3>ContactPoint</h3>
            <p>Contact detail such as phone or email.</p>

            <pre><code class="language-json">{
  "system": "phone",
  "value": "555-123-4567",
  "use": "home",
  "rank": 1
}</code></pre>

            <h3>Quantity</h3>
            <p>Measured amount.</p>

            <pre><code class="language-json">{
  "value": 95,
  "unit": "mg/dL",
  "system": "http://unitsofmeasure.org",
  "code": "mg/dL"
}</code></pre>

            <h3>Reference</h3>
            <p>Reference to another resource.</p>

            <pre><code class="language-json">{
  "reference": "Patient/example",
  "type": "Patient",
  "display": "John Doe"
}</code></pre>

            <h3>Period</h3>
            <p>Time range.</p>

            <pre><code class="language-json">{
  "start": "2024-01-15T10:00:00Z",
  "end": "2024-01-15T11:00:00Z"
}</code></pre>

            <h2>Mapping Data Types</h2>

            <h3>Example: Mapping to CodeableConcept</h3>

            <pre><code class="language-python">def map_to_codeable_concept(code, display, system="http://snomed.info/sct"):
    """Map a code to FHIR CodeableConcept"""
    return {
        "coding": [{
            "system": system,
            "code": code,
            "display": display
        }],
        "text": display
    }</code></pre>

            <h3>Example: Mapping to Identifier</h3>

            <pre><code class="language-python">def map_to_identifier(value, system, type_code=None):
    """Map value to FHIR Identifier"""
    identifier = {
        "system": system,
        "value": value
    }

    if type_code:
        identifier["type"] = {
            "coding": [{
                "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                "code": type_code
            }]
        }

    return identifier</code></pre>

            <h2>Common Mapping Scenarios</h2>

            <h3>Date Format Conversion</h3>

            <pre><code class="language-python">from datetime import datetime

def convert_to_fhir_date(date_string, input_format="%m/%d/%Y"):
    """Convert various date formats to FHIR date (YYYY-MM-DD)"""
    try:
        dt = datetime.strptime(date_string, input_format)
        return dt.strftime("%Y-%m-%d")
    except ValueError:
        return None</code></pre>

            <h3>Phone Number Formatting</h3>

            <pre><code class="language-python">def format_phone_to_contactpoint(phone, use="home"):
    """Convert phone number to ContactPoint"""
    # Clean phone number
    cleaned = ''.join(filter(str.isdigit, phone))

    # Format for E.164 if it's a US number
    if len(cleaned) == 10:
        formatted = f"+1-{cleaned[:3]}-{cleaned[3:6]}-{cleaned[6:]}"
    else:
        formatted = phone

    return {
        "system": "phone",
        "value": formatted,
        "use": use
    }</code></pre>

            <h2>Best Practices</h2>

            <div class="success-box">
                <ul>
                    <li>Always validate data types before mapping</li>
                    <li>Use the most specific data type (e.g., code vs string)</li>
                    <li>Include both system and code in Coding elements</li>
                    <li>Provide display text for human readability</li>
                    <li>Use standard code systems (LOINC, SNOMED CT, RxNorm)</li>
                    <li>Handle null/missing values appropriately</li>
                    <li>Preserve precision in decimal values</li>
                </ul>
            </div>

            <h2>Resources</h2>
            <ul>
                <li><a href="http://hl7.org/fhir/datatypes.html" target="_blank">FHIR Data Types Specification</a></li>
                <li><a href="http://hl7.org/fhir/terminologies.html" target="_blank">Using Terminologies</a></li>
            </ul>
        `
    },

    'terminology': {
        title: 'Terminology Mapping',
        content: `
            <h1>Terminology Mapping</h1>

            <h2>Overview</h2>
            <p>Terminology mapping is the process of converting codes from one coding system to another. This is essential for FHIR interoperability as different systems may use different code systems.</p>

            <div class="info-box">
                <strong>Why Terminology Mapping Matters:</strong><br>
                Proper code mapping ensures semantic interoperability - that the meaning of data is preserved when exchanged between systems.
            </div>

            <h2>Common Code Systems</h2>

            <table>
                <thead>
                    <tr>
                        <th>Code System</th>
                        <th>Purpose</th>
                        <th>URI</th>
                        <th>Example Use</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>LOINC</td>
                        <td>Lab tests, observations</td>
                        <td>http://loinc.org</td>
                        <td>Observation.code</td>
                    </tr>
                    <tr>
                        <td>SNOMED CT</td>
                        <td>Clinical terms, diagnoses</td>
                        <td>http://snomed.info/sct</td>
                        <td>Condition.code</td>
                    </tr>
                    <tr>
                        <td>RxNorm</td>
                        <td>Medications</td>
                        <td>http://www.nlm.nih.gov/research/umls/rxnorm</td>
                        <td>Medication.code</td>
                    </tr>
                    <tr>
                        <td>ICD-10</td>
                        <td>Diagnoses (billing)</td>
                        <td>http://hl7.org/fhir/sid/icd-10</td>
                        <td>Condition.code</td>
                    </tr>
                    <tr>
                        <td>CPT</td>
                        <td>Procedures (billing)</td>
                        <td>http://www.ama-assn.org/go/cpt</td>
                        <td>Procedure.code</td>
                    </tr>
                    <tr>
                        <td>CVX</td>
                        <td>Vaccines</td>
                        <td>http://hl7.org/fhir/sid/cvx</td>
                        <td>Immunization.vaccineCode</td>
                    </tr>
                    <tr>
                        <td>UCUM</td>
                        <td>Units of measure</td>
                        <td>http://unitsofmeasure.org</td>
                        <td>Quantity.code</td>
                    </tr>
                </tbody>
            </table>

            <h2>Mapping Strategies</h2>

            <h3>1. Direct Mapping (1:1)</h3>
            <p>Simple one-to-one correspondence between codes.</p>

            <pre><code class="language-python">GENDER_MAP = {
    'M': 'male',
    'F': 'female',
    'O': 'other',
    'U': 'unknown'
}

def map_gender(source_gender):
    return GENDER_MAP.get(source_gender, 'unknown')</code></pre>

            <h3>2. Lookup Table Mapping</h3>
            <p>Use a mapping table for complex conversions.</p>

            <pre><code class="language-python">import pandas as pd

# Load mapping table
icd10_to_snomed = pd.read_csv('icd10_snomed_map.csv')

def map_icd10_to_snomed(icd10_code):
    """Map ICD-10 to SNOMED CT"""
    row = icd10_to_snomed[icd10_to_snomed['icd10_code'] == icd10_code]

    if not row.empty:
        return {
            'system': 'http://snomed.info/sct',
            'code': row.iloc[0]['snomed_code'],
            'display': row.iloc[0]['snomed_display']
        }
    return None</code></pre>

            <h3>3. Terminology Server Mapping</h3>
            <p>Use a FHIR terminology server for dynamic mapping.</p>

            <pre><code class="language-python">import requests

def translate_code(code, source_system, target_system, tx_server_url):
    """Use $translate operation on terminology server"""
    params = {
        'code': code,
        'system': source_system,
        'target': target_system
    }

    response = requests.get(
        f"{tx_server_url}/ConceptMap/$translate",
        params=params
    )

    if response.status_code == 200:
        result = response.json()
        if 'parameter' in result:
            for param in result['parameter']:
                if param['name'] == 'match':
                    return param['part'][0]['valueCoding']

    return None

# Example usage
tx_server = "https://tx.fhir.org/r4"
snomed_code = translate_code(
    code="E11.9",
    source_system="http://hl7.org/fhir/sid/icd-10",
    target_system="http://snomed.info/sct",
    tx_server_url=tx_server
)</code></pre>

            <h2>Common Mapping Scenarios</h2>

            <h3>ICD-10 to SNOMED CT</h3>

            <pre><code class="language-python">ICD10_SNOMED_MAP = {
    'E11.9': {  # Type 2 diabetes without complications
        'system': 'http://snomed.info/sct',
        'code': '44054006',
        'display': 'Diabetes mellitus type 2'
    },
    'I10': {  # Essential hypertension
        'system': 'http://snomed.info/sct',
        'code': '59621000',
        'display': 'Essential hypertension'
    }
}

def map_diagnosis_code(icd10_code):
    """Map ICD-10 diagnosis to SNOMED CT"""
    if icd10_code in ICD10_SNOMED_MAP:
        return {
            'coding': [
                {
                    'system': 'http://hl7.org/fhir/sid/icd-10',
                    'code': icd10_code
                },
                ICD10_SNOMED_MAP[icd10_code]
            ]
        }
    else:
        # Return ICD-10 only if no SNOMED mapping
        return {
            'coding': [{
                'system': 'http://hl7.org/fhir/sid/icd-10',
                'code': icd10_code
            }]
        }</code></pre>

            <h3>Local Codes to Standard Codes</h3>

            <pre><code class="language-python">LOCAL_TO_LOINC = {
    'GLU': {
        'system': 'http://loinc.org',
        'code': '15074-8',
        'display': 'Glucose [Moles/volume] in Blood'
    },
    'HGB': {
        'system': 'http://loinc.org',
        'code': '718-7',
        'display': 'Hemoglobin [Mass/volume] in Blood'
    }
}

def map_lab_code(local_code, local_system):
    """Map local lab code to LOINC"""
    return {
        'coding': [
            {
                'system': local_system,
                'code': local_code
            },
            LOCAL_TO_LOINC.get(local_code, {})
        ] if local_code in LOCAL_TO_LOINC else [{
            'system': local_system,
            'code': local_code
        }]
    }</code></pre>

            <h2>Using ConceptMap Resources</h2>

            <p>FHIR ConceptMap resources define mappings between code systems.</p>

            <pre><code class="language-json">{
  "resourceType": "ConceptMap",
  "id": "gender-mapping",
  "url": "http://example.org/fhir/ConceptMap/gender-mapping",
  "name": "GenderCodeMapping",
  "status": "active",
  "sourceUri": "http://example.org/fhir/ValueSet/local-gender",
  "targetUri": "http://hl7.org/fhir/ValueSet/administrative-gender",
  "group": [{
    "source": "http://example.org/codes/gender",
    "target": "http://hl7.org/fhir/administrative-gender",
    "element": [
      {
        "code": "M",
        "target": [{
          "code": "male",
          "equivalence": "equivalent"
        }]
      },
      {
        "code": "F",
        "target": [{
          "code": "female",
          "equivalence": "equivalent"
        }]
      }
    ]
  }]
}</code></pre>

            <h2>Handling Unmappable Codes</h2>

            <pre><code class="language-python">def safe_code_mapping(source_code, mapping_dict, source_system):
    """Safely map codes with fallback"""
    if source_code in mapping_dict:
        # Return both source and target codes
        return {
            'coding': [
                {
                    'system': source_system,
                    'code': source_code
                },
                mapping_dict[source_code]
            ]
        }
    else:
        # Return source code only with extension noting unmapped
        return {
            'coding': [{
                'system': source_system,
                'code': source_code
            }],
            'extension': [{
                'url': 'http://example.org/fhir/StructureDefinition/unmapped-code',
                'valueBoolean': True
            }]
        }</code></pre>

            <h2>Best Practices</h2>

            <div class="success-box">
                <ul>
                    <li>Always include the source code system alongside mapped codes</li>
                    <li>Document mapping decisions and equivalence levels</li>
                    <li>Use standard code systems (LOINC, SNOMED CT, RxNorm) when possible</li>
                    <li>Maintain mapping tables in version control</li>
                    <li>Use ConceptMap resources for reusable mappings</li>
                    <li>Test mappings with real-world data</li>
                    <li>Plan for codes that don't map cleanly (1:many, many:1)</li>
                    <li>Keep original codes when mapping is uncertain</li>
                </ul>
            </div>

            <h2>Tools and Resources</h2>

            <ul>
                <li><a href="https://www.nlm.nih.gov/research/umls/mapping_projects/index.html" target="_blank">UMLS Mapping Projects</a></li>
                <li><a href="https://loinc.org/relma/" target="_blank">RELMA (LOINC Mapping Tool)</a></li>
                <li><a href="https://www.nlm.nih.gov/research/umls/rxnorm/index.html" target="_blank">RxNorm</a></li>
                <li><a href="https://tx.fhir.org/" target="_blank">FHIR Terminology Server</a></li>
                <li><a href="http://hl7.org/fhir/conceptmap.html" target="_blank">FHIR ConceptMap Resource</a></li>
            </ul>
        `
    },

    'pipeline-faq': {
        title: 'FHIR Pipeline FAQ',
        content: `
# FHIR Pipeline FAQ

Technical documentation for backend architecture and libraries

---

## Table of Contents

- [Backend Architecture](#backend-architecture)
- [FHIR.Resources Library](#fhir-resources-library)
- [Pydantic Validation](#pydantic-validation)
- [Polars Data Processing](#polars-data-processing)
- [YAML Mappings](#yaml-mappings)
- [Processing Pipeline](#processing-pipeline)
- [Validation Layers](#validation-layers)
- [Deployment & Integration](#deployment-integration)

---

## Backend Architecture

**Q: What is the overall architecture of the FHIR pipeline?**

<div class="info-box">
<strong>Pipeline Flow:</strong><br>
CSV Upload → Data Validation → YAML Mapping → FHIR Generation → Export
</div>

**A:** The FHIR pipeline uses a modular Flask-based architecture with the following components:

- **Web Layer**: Flask application serving the UI and API endpoints
- **Validation Layer**: Pydantic and Polars-based data validation
- **Mapping Engine**: YAML-driven field transformation system
- **FHIR Builder**: Python class that constructs FHIR Observation resources
- **Export System**: Multi-format output generation (NDJSON, Bundle, Summary)

\`\`\`plaintext
Project Structure:
├── web_app.py              # Flask web application & API
├── app/
│   ├── mapping/
│   │   └── apply.py        # YAML mapping application
│   ├── models/
│   │   └── observation_builder.py  # FHIR resource builder
│   ├── validate/
│   │   └── dataframe_checks.py     # Data validation logic
│   └── io/
│       ├── mapping.yaml    # Field transformation rules
│       └── sample_input.csv # Demo data
└── templates/
    └── fhir_pipeline.html  # Web interface
\`\`\`

---

## FHIR.Resources Library

**Q: What is fhir.resources and how does it work in the pipeline?**

**A:** The \`fhir.resources\` library provides Python classes for all FHIR resource types, ensuring compliance with the FHIR R4 standard. It handles:

- **Resource Modeling**: Python classes that mirror FHIR resource structures
- **Validation**: Built-in validation for required fields and data types
- **Serialization**: Convert Python objects to/from JSON
- **Profile Support**: Compliance with US Core and other FHIR profiles

\`\`\`python
from fhir.resources.observation import Observation

# Create FHIR Observation resource
observation = Observation(
    status="final",
    code={
        "coding": [{
            "system": "http://loinc.org",
            "code": "718-7",
            "display": "Hemoglobin [Mass/volume] in Blood"
        }]
    },
    subject={"reference": "Patient/12345"},
    valueQuantity={
        "value": 14.5,
        "unit": "g/dL",
        "system": "http://unitsofmeasure.org"
    }
)

# Validates structure and required fields automatically
fhir_json = observation.json(indent=2)
\`\`\`

**Q: Why use fhir.resources instead of building JSON manually?**

**A:** Manual JSON construction is error-prone and doesn't guarantee FHIR compliance. The library provides:

- Type safety and validation
- Automatic compliance with FHIR specifications
- Easy serialization to multiple formats
- Integration with FHIR servers and validators

---

## Pydantic Validation

**Q: How does Pydantic contribute to data validation?**

**A:** Pydantic provides runtime type checking and data validation throughout the pipeline:

- **Data Models**: Type-safe classes for CSV row structures
- **Validation Rules**: Custom validators for clinical data formats
- **Error Handling**: Detailed error messages for invalid data
- **Integration**: Works seamlessly with fhir.resources (which is built on Pydantic)

\`\`\`python
from pydantic import BaseModel, validator
from datetime import datetime
from typing import Optional

class ClinicalObservation(BaseModel):
    patient_id: str
    encounter_id: Optional[str]
    obs_datetime: datetime
    loinc: str
    system: str = "http://loinc.org"
    value: float
    unit: str
    status: str = "final"

    @validator('patient_id')
    def validate_patient_id(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Patient ID cannot be empty')
        return v.strip()

    @validator('loinc')
    def validate_loinc_format(cls, v):
        if not v or '-' not in v:
            raise ValueError('LOINC code must contain hyphen (e.g., 718-7)')
        return v
\`\`\`

**Q: What types of validation errors does Pydantic catch?**

- Missing required fields
- Incorrect data types (string instead of number)
- Invalid date formats
- Custom business rule violations
- Range validation for numeric values

---

## Polars Data Processing

**Q: Why use Polars instead of Pandas for data processing?**

**A:** Polars provides several advantages for healthcare data processing:

- **Performance**: 10-30x faster than Pandas for many operations
- **Memory Efficiency**: Better handling of large clinical datasets
- **Type Safety**: Stricter type system catches data quality issues
- **Lazy Evaluation**: Optimized query planning for complex operations
- **Better NULL handling**: Important for clinical data with missing values

\`\`\`python
import polars as pl

# Load and validate CSV data
df = pl.read_csv("clinical_data.csv", try_parse_dates=True)

# Data quality checks with Polars expressions
validation_results = df.select([
    pl.col("patient_id").is_null().sum().alias("missing_patient_ids"),
    pl.col("value").is_numeric().sum().alias("valid_numeric_values"),
    pl.col("obs_datetime").str.strptime(pl.Date, "%Y-%m-%d").is_not_null().sum().alias("valid_dates"),
    pl.col("loinc").str.contains("-").sum().alias("valid_loinc_codes")
])

# Type casting with error handling
df_clean = df.with_columns([
    pl.col("value").cast(pl.Float64, strict=False),
    pl.col("obs_datetime").str.strptime(pl.Datetime, "%Y-%m-%d %H:%M:%S")
])
\`\`\`

**Q: How does Polars integrate with the validation pipeline?**

**A:** Polars handles the initial data processing and quality checks:

- CSV parsing with automatic type inference
- Data quality assessments (missing values, type mismatches)
- Efficient batch processing of large datasets
- Integration with Pydantic for row-level validation

---

## YAML Mappings

**Q: How do YAML mappings transform CSV data to FHIR?**

**A:** YAML mappings define declarative transformation rules without requiring code changes:

\`\`\`yaml
# mapping.yaml
observation:
  resourceType: "Observation"
  status:
    source: "status"
    default: "final"

  code:
    coding:
      - system:
          source: "system"
          default: "http://loinc.org"
        code:
          source: "loinc"
        display:
          lookup: "loinc_displays"

  subject:
    reference:
      template: "Patient/{patient_id}"

  valueQuantity:
    value:
      source: "value"
      type: "number"
    unit:
      source: "unit"
    system:
      default: "http://unitsofmeasure.org"

  effectiveDateTime:
    source: "obs_datetime"
    format: "datetime"
\`\`\`

**Q: What mapping features are supported?**

- **Direct Field Mapping**: \`source: "field_name"\`
- **Default Values**: \`default: "final"\`
- **Template Substitution**: \`template: "Patient/{patient_id}"\`
- **Type Conversion**: \`type: "number"\`
- **Conditional Logic**: Based on source data values
- **Lookup Tables**: Reference external code systems

**Q: Why use YAML instead of hardcoded transformations?**

- Easy to modify mappings without code changes
- Version control for mapping specifications
- Non-technical users can modify mappings
- Support for multiple mapping profiles
- Clear documentation of transformation logic

---

## Processing Pipeline

**Q: What are the steps in the processing pipeline?**

<div class="info-box">
<strong>Pipeline Stages:</strong><br>
1. Upload (CSV File Input) → 2. Parse (Polars DataFrame) → 3. Validate (Pydantic Models) → 4. Map (YAML Rules) → 5. Build (FHIR Resources) → 6. Export (Multiple Formats)
</div>

**A:** The pipeline processes data through six distinct stages:

1. **File Upload**: Accept CSV files with clinical observations
2. **Data Parsing**: Use Polars to read and analyze CSV structure
3. **Data Validation**: Apply Pydantic models to ensure data quality
4. **Field Mapping**: Transform data using YAML mapping specifications
5. **FHIR Building**: Generate compliant FHIR Observation resources
6. **Export Generation**: Create NDJSON, Bundle, and Summary outputs

\`\`\`python
def process_pipeline():
    # 1. Load and validate CSV
    csv_result = load_and_validate_csv(filepath)

    # 2. Apply YAML mappings
    mapping_spec = load_mapping_spec("mapping.yaml")
    mapped_data = apply_mappings(csv_result['dataframe'], mapping_spec)

    # 3. Build FHIR resources
    observations = []
    for row in mapped_data:
        obs = ObservationBuilder.build_from_dict(row)
        observations.append(obs)

    # 4. Validate FHIR resources
    valid_observations = validate_fhir_resources(observations)

    # 5. Generate exports
    export_results = generate_exports(valid_observations)

    return ProcessingResult(
        success_rate=len(valid_observations) / len(observations),
        observations=valid_observations,
        exports=export_results
    )
\`\`\`

**Q: How does error handling work in the pipeline?**

- **Graceful Degradation**: Invalid rows are skipped, not the entire batch
- **Error Categorization**: Separate validation, mapping, and FHIR errors
- **Detailed Logging**: Each error includes row number and specific issue
- **Success Metrics**: Report percentage of successfully processed records

---

## Validation Layers

**Q: What validation layers ensure data quality?**

**A:** The system implements multiple validation layers:

### Validation Layers

| Layer | Focus | Tools |
|-------|-------|-------|
| **CSV Structure** | File format, encoding, columns | Polars |
| **Data Types** | Numeric, date, string validation | Pydantic |
| **Business Rules** | Clinical data requirements | Custom validators |
| **FHIR Compliance** | Resource structure validation | fhir.resources |
| **US Core Profile** | Healthcare interoperability standards | Profile validators |

### Common Validation Errors

- Missing required fields (patient_id, loinc)
- Invalid LOINC codes or formats
- Non-numeric values in numeric fields
- Invalid date formats
- Empty or whitespace-only values

\`\`\`python
# Validation pipeline example
def validate_observation_data(df):
    results = ValidationResult()

    # Layer 1: Required field validation
    required_fields = ['patient_id', 'loinc', 'value', 'unit']
    for field in required_fields:
        if field not in df.columns:
            results.add_error(f"Missing required column: {field}")

    # Layer 2: Data type validation
    numeric_validations = df.select([
        pl.col("value").is_numeric().alias("value_numeric"),
        pl.col("patient_id").is_not_null().alias("patient_id_present")
    ])

    # Layer 3: Business rule validation
    loinc_validation = df.filter(
        pl.col("loinc").str.contains("-") == False
    ).select("row_nr", "loinc")

    # Layer 4: FHIR resource validation (after mapping)
    for obs_dict in mapped_observations:
        try:
            observation = Observation(**obs_dict)  # Validates FHIR structure
            results.add_valid_observation(observation)
        except ValidationError as e:
            results.add_fhir_error(str(e))

    return results
\`\`\`

---

## Deployment & Integration

**Q: How can the FHIR pipeline be deployed and integrated?**

**A:** The pipeline supports multiple deployment scenarios:

### Deployment Options

- **Replit Deployment**: One-click deployment with automatic scaling
- **Docker Container**: Containerized deployment for any environment
- **Cloud Platforms**: AWS, GCP, Azure with managed services
- **On-Premises**: Local installation for sensitive healthcare data

### Integration Points

- **HAPI FHIR Server**: Direct upload to FHIR repositories
- **EHR Systems**: Integration via FHIR APIs
- **Data Lakes**: Bulk export to analytics platforms
- **HL7 Networks**: Standard healthcare data exchange

\`\`\`python
# Example HAPI FHIR server integration
import requests

def upload_to_fhir_server(observations, server_base_url):
    headers = {
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json'
    }

    results = []
    for obs in observations:
        response = requests.post(
            f"{server_base_url}/Observation",
            json=obs.dict(exclude_none=True),
            headers=headers
        )
        results.append({
            'status': response.status_code,
            'resource_id': response.json().get('id') if response.ok else None,
            'errors': response.json().get('issue', []) if not response.ok else []
        })

    return results
\`\`\`

### Security & Compliance

- **HIPAA Compliance**: Secure handling of PHI data
- **Data Encryption**: At rest and in transit
- **Access Controls**: Role-based authentication
- **Audit Logging**: Comprehensive processing logs
- **Data Residency**: Control over data location

---

<div class="info-box">
For additional questions or technical support, please refer to the <a href="https://hl7.org/fhir/" target="_blank">HL7 FHIR Documentation</a> or the project repository.
</div>
        `
    },

    'fhir-tools': {
        title: 'FHIR Tools Overview',
        content: `
<h1>FHIR Tools Overview</h1>

<p>A comprehensive guide to tools and libraries for working with FHIR data.</p>

<h2>Validation Tools</h2>

<h3>FHIR Validator (Official)</h3>
<p>The official HL7 FHIR validator supports all FHIR versions and profiles.</p>

<pre><code class="language-bash"># Download the validator
wget https://github.com/hapifhir/org.hl7.fhir.core/releases/latest/download/validator_cli.jar

# Validate a resource
java -jar validator_cli.jar mypatient.json -version 4.0</code></pre>

<p><strong>Features:</strong></p>
<ul>
<li>Validates against base FHIR and custom profiles</li>
<li>Checks terminology bindings</li>
<li>Generates detailed error reports</li>
</ul>

<h3>HAPI FHIR Validator</h3>
<p>Java-based validation integrated with HAPI FHIR server.</p>

<pre><code class="language-java">FhirContext ctx = FhirContext.forR4();
FhirValidator validator = ctx.newValidator();
ValidationResult result = validator.validateWithResult(patient);</code></pre>

<h2>Development Libraries</h2>

<h3>Python</h3>

<p><strong>fhir.resources</strong></p>
<pre><code class="language-bash">pip install fhir.resources</code></pre>

<pre><code class="language-python">from fhir.resources.patient import Patient

patient = Patient(
    id="123",
    name=[{"family": "Smith", "given": ["John"]}]
)</code></pre>

<p><strong>FHIR-Parser</strong></p>
<p>Generates Python classes from FHIR StructureDefinitions.</p>

<h3>JavaScript/TypeScript</h3>

<p><strong>FHIR.js</strong></p>
<pre><code class="language-bash">npm install fhir.js</code></pre>

<pre><code class="language-javascript">const FHIR = require('fhir.js');
const client = FHIR.client('https://hapi.fhir.org/baseR4');</code></pre>

<h3>Java</h3>

<p><strong>HAPI FHIR</strong></p>
<p>The most comprehensive Java FHIR library.</p>

<pre><code class="language-xml">&lt;dependency&gt;
  &lt;groupId&gt;ca.uhn.hapi.fhir&lt;/groupId&gt;
  &lt;artifactId&gt;hapi-fhir-structures-r4&lt;/artifactId&gt;
  &lt;version&gt;6.4.0&lt;/version&gt;
&lt;/dependency&gt;</code></pre>

<h2>Mapping Tools</h2>

<h3>Microsoft FHIR Converter</h3>
<p>Converts HL7 v2, C-CDA, and JSON to FHIR using Liquid templates.</p>

<pre><code class="language-bash">docker pull mcr.microsoft.com/healthcareapis/fhir-converter:latest</code></pre>

<h3>Bulk Data Tools</h3>

<p><strong>Synthea</strong></p>
<p>Generates synthetic patient data in FHIR format.</p>

<pre><code class="language-bash">java -jar synthea.jar -p 100</code></pre>

<p><strong>Bulk Data Export Tools</strong></p>
<ul>
<li>SMART Bulk Data IG implementation</li>
<li>Async export for large datasets</li>
</ul>

<h2>Testing Tools</h2>

<h3>Touchstone</h3>
<p>Official FHIR testing platform for conformance testing.</p>

<h3>Inferno</h3>
<p>Open-source testing tool for FHIR APIs and US Core compliance.</p>

<pre><code class="language-bash">git clone https://github.com/onc-healthit/inferno
docker-compose up</code></pre>

<h2>Online Tools</h2>

<ul>
<li><strong>FHIR Validator</strong>: <a href="https://validator.fhir.org" target="_blank">https://validator.fhir.org</a></li>
<li><strong>FHIR Path Tester</strong>: <a href="https://hl7.org/fhirpath.js/" target="_blank">https://hl7.org/fhirpath.js/</a></li>
<li><strong>SIMPLIFIER</strong>: Profile registry and validation</li>
</ul>

<h2>IDE Extensions</h2>

<h3>VS Code Extensions</h3>
<ul>
<li><strong>FHIR Tools</strong>: Syntax highlighting and validation</li>
<li><strong>REST Client</strong>: Test FHIR API endpoints</li>
</ul>

<h2>Resources</h2>

<ul>
<li><a href="https://registry.fhir.org/" target="_blank">FHIR Registry</a> - Official tool registry</li>
<li><a href="https://github.com/HL7/fhir" target="_blank">FHIR GitHub</a> - Source code and issues</li>
</ul>
        `
    },

    'validation': {
        title: 'Validation & Testing',
        content: `
<h1>Validation & Testing</h1>

<p>Comprehensive guide to validating FHIR resources and testing your mappings.</p>

<h2>Why Validate?</h2>

<p>Validation ensures:</p>
<ul>
<li><strong>Compliance</strong>: Resources meet FHIR specifications</li>
<li><strong>Interoperability</strong>: Data works across different systems</li>
<li><strong>Data Quality</strong>: Correct data types and required fields</li>
<li><strong>Profile Conformance</strong>: Adherence to US Core or custom profiles</li>
</ul>

<h2>Validation Levels</h2>

<h3>1. Structure Validation</h3>

<p>Ensures resources have correct JSON/XML structure and required elements.</p>

<pre><code class="language-python">from fhir.resources.patient import Patient
from pydantic import ValidationError

try:
    patient = Patient(**data)
    print("Valid structure!")
except ValidationError as e:
    print(f"Validation errors: {e}")</code></pre>

<h3>2. Cardinality Validation</h3>

<p>Checks minimum and maximum occurrences of elements.</p>

<ul>
<li><strong>0..1</strong>: Optional, maximum one</li>
<li><strong>1..1</strong>: Required, exactly one</li>
<li><strong>0..*</strong>: Optional, any number</li>
<li><strong>1..*</strong>: Required, at least one</li>
</ul>

<h3>3. Data Type Validation</h3>

<p>Verifies correct data types for each element.</p>

<pre><code class="language-python"># Incorrect - will fail validation
patient = Patient(
    birthDate="not-a-date"  # Should be YYYY-MM-DD
)

# Correct
patient = Patient(
    birthDate="1990-01-15"
)</code></pre>

<h3>4. Terminology Validation</h3>

<p>Checks codes against required value sets.</p>

<pre><code class="language-json">{
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "718-7"  // Must be valid LOINC code
    }]
  }
}</code></pre>

<h3>5. Profile Validation</h3>

<p>Validates against specific profiles like US Core.</p>

<pre><code class="language-bash">java -jar validator_cli.jar patient.json \
  -version 4.0 \
  -ig hl7.fhir.us.core#4.0.0</code></pre>

<h2>Validation Tools</h2>

<h3>Command Line</h3>

<p><strong>FHIR Validator</strong></p>
<pre><code class="language-bash"># Basic validation
java -jar validator_cli.jar resource.json

# With specific profile
java -jar validator_cli.jar resource.json \
  -profile http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient

# Generate HTML output
java -jar validator_cli.jar resource.json -output validation-report.html</code></pre>

<h3>Python</h3>

<p><strong>fhir.resources with Pydantic</strong></p>
<pre><code class="language-python">from fhir.resources.observation import Observation
from pydantic import ValidationError

def validate_observation(data):
    try:
        obs = Observation(**data)
        # Additional custom validation
        if obs.status not in ["final", "preliminary"]:
            raise ValueError("Invalid status")
        return True, obs
    except ValidationError as e:
        return False, str(e)

# Usage
valid, result = validate_observation(observation_data)
if valid:
    print("✓ Valid observation")
else:
    print(f"✗ Validation failed: {result}")</code></pre>

<h3>JavaScript</h3>

<p><strong>FHIR Validator.js</strong></p>
<pre><code class="language-javascript">const { Validator } = require('@asymmetrik/fhir-validator');
const validator = new Validator();

const isValid = validator.validate(resource, {
  version: '4.0.1'
});</code></pre>

<h2>Testing Strategies</h2>

<h3>Unit Testing</h3>

<p>Test individual resource creation and validation.</p>

<pre><code class="language-python">import pytest
from fhir.resources.patient import Patient

def test_create_patient():
    patient = Patient(
        id="test-123",
        name=[{"family": "Test", "given": ["John"]}]
    )
    assert patient.id == "test-123"
    assert patient.name[0].family == "Test"

def test_invalid_patient():
    with pytest.raises(ValidationError):
        Patient(birthDate="invalid-date")</code></pre>

<h3>Integration Testing</h3>

<p>Test complete mapping pipelines.</p>

<pre><code class="language-python">def test_csv_to_fhir_pipeline():
    # Load test CSV
    csv_data = load_test_csv("test-data.csv")

    # Run through pipeline
    fhir_resources = map_csv_to_fhir(csv_data)

    # Validate each resource
    for resource in fhir_resources:
        assert validate_fhir_resource(resource)

    # Check expected count
    assert len(fhir_resources) == expected_count</code></pre>

<h3>Conformance Testing</h3>

<p>Use Inferno or Touchstone for full conformance testing.</p>

<pre><code class="language-bash"># Run Inferno tests
docker run -p 4567:4567 infernocommunity/inferno:latest

# Access at http://localhost:4567</code></pre>

<h2>Best Practices</h2>

<h3>1. Validate Early and Often</h3>
<pre><code class="language-python">def process_data(source_data):
    # Validate source data first
    validate_source(source_data)

    # Map to FHIR
    fhir_resource = map_to_fhir(source_data)

    # Validate FHIR resource
    validate_fhir(fhir_resource)

    return fhir_resource</code></pre>

<h3>2. Use Profile-Specific Validation</h3>

<p>Always validate against the specific profiles you're implementing.</p>

<h3>3. Automated Validation in CI/CD</h3>

<pre><code class="language-yaml"># GitHub Actions example
- name: Validate FHIR Resources
  run: |
    java -jar validator_cli.jar output/*.json</code></pre>

<h3>4. Maintain Test Data Sets</h3>

<p>Keep sample valid and invalid resources for testing.</p>

<pre><code>tests/
  fixtures/
    valid/
      patient-example.json
      observation-example.json
    invalid/
      patient-missing-required.json
      observation-bad-code.json</code></pre>

<h2>Common Validation Errors</h2>

<h3>Missing Required Fields</h3>
<pre><code>ERROR: Patient.name: minimum required = 1, but only found 0</code></pre>

<h3>Invalid Code System</h3>
<pre><code>ERROR: Observation.code: Unknown code system http://example.com/codes</code></pre>

<h3>Cardinality Violation</h3>
<pre><code>ERROR: Patient.identifier: maximum allowed = 1, but found 2</code></pre>

<h3>Invalid Reference</h3>
<pre><code>ERROR: Observation.subject: Reference must be to Patient, found Practitioner</code></pre>

<h2>Validation Checklist</h2>

<ul>
<li>Structure validation (JSON/XML syntax)</li>
<li>Required fields present</li>
<li>Correct data types</li>
<li>Valid codes from required value sets</li>
<li>Cardinality constraints met</li>
<li>Profile-specific requirements</li>
<li>Business rule validation</li>
<li>Reference integrity</li>
</ul>
        `
    },

    'extensions': {
        title: 'FHIR Extensions',
        content: `
<h1>FHIR Extensions</h1>

<p>Learn how to use and create FHIR extensions for data not covered by base resources.</p>

<h2>What are Extensions?</h2>

<p>Extensions allow you to add data elements not defined in the base FHIR specification. They enable:</p>

<ul>
<li><strong>Flexibility</strong>: Capture data specific to your use case</li>
<li><strong>Interoperability</strong>: Share custom data in a standardized way</li>
<li><strong>Evolution</strong>: Add new concepts before they're standardized</li>
</ul>

<h2>Extension Structure</h2>

<pre><code class="language-json">{
  "extension": [{
    "url": "http://example.org/fhir/StructureDefinition/patient-religion",
    "valueCodeableConcept": {
      "coding": [{
        "system": "http://terminology.hl7.org/CodeSystem/v3-ReligiousAffiliation",
        "code": "1013",
        "display": "Christian"
      }]
    }
  }]
}</code></pre>

<h2>Common US Core Extensions</h2>

<h3>Race Extension</h3>

<pre><code class="language-json">{
  "extension": [{
    "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
    "extension": [{
      "url": "ombCategory",
      "valueCoding": {
        "system": "urn:oid:2.16.840.1.113883.6.238",
        "code": "2106-3",
        "display": "White"
      }
    }, {
      "url": "text",
      "valueString": "White"
    }]
  }]
}</code></pre>

<h3>Ethnicity Extension</h3>

<pre><code class="language-json">{
  "extension": [{
    "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
    "extension": [{
      "url": "ombCategory",
      "valueCoding": {
        "system": "urn:oid:2.16.840.1.113883.6.238",
        "code": "2186-5",
        "display": "Not Hispanic or Latino"
      }
    }, {
      "url": "text",
      "valueString": "Not Hispanic or Latino"
    }]
  }]
}</code></pre>

<h3>Birth Sex Extension</h3>

<pre><code class="language-json">{
  "extension": [{
    "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
    "valueCode": "M"
  }]
}</code></pre>

<h2>Creating Custom Extensions</h2>

<h3>1. Define the Extension</h3>

<p>Create a StructureDefinition for your extension.</p>

<pre><code class="language-json">{
  "resourceType": "StructureDefinition",
  "url": "http://example.org/fhir/StructureDefinition/patient-preferred-language",
  "name": "PatientPreferredLanguage",
  "status": "draft",
  "kind": "complex-type",
  "abstract": false,
  "context": [{
    "type": "element",
    "expression": "Patient"
  }],
  "type": "Extension",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Extension",
  "differential": {
    "element": [{
      "id": "Extension",
      "path": "Extension",
      "short": "Patient's preferred language"
    }, {
      "id": "Extension.extension",
      "path": "Extension.extension",
      "max": "0"
    }, {
      "id": "Extension.url",
      "path": "Extension.url",
      "fixedUri": "http://example.org/fhir/StructureDefinition/patient-preferred-language"
    }, {
      "id": "Extension.value[x]",
      "path": "Extension.value[x]",
      "type": [{
        "code": "CodeableConcept"
      }]
    }]
  }
}</code></pre>

<h3>2. Use the Extension</h3>

<pre><code class="language-python">from fhir.resources.patient import Patient

patient = Patient(
    id="example",
    extension=[{
        "url": "http://example.org/fhir/StructureDefinition/patient-preferred-language",
        "valueCodeableConcept": {
            "coding": [{
                "system": "urn:ietf:bcp:47",
                "code": "en-US",
                "display": "English (United States)"
            }]
        }
    }]
)</code></pre>

<h2>Nested Extensions</h2>

<p>Extensions can contain other extensions for complex data.</p>

<pre><code class="language-json">{
  "extension": [{
    "url": "http://example.org/fhir/StructureDefinition/contact-details",
    "extension": [{
      "url": "phone",
      "valueString": "555-1234"
    }, {
      "url": "email",
      "valueString": "patient@example.com"
    }, {
      "url": "preferred",
      "valueString": "email"
    }]
  }]
}</code></pre>

<h2>Modifier Extensions</h2>

<p>Modifier extensions change the meaning of the resource and must be understood by all processors.</p>

<pre><code class="language-json">{
  "modifierExtension": [{
    "url": "http://example.org/fhir/StructureDefinition/data-absent-reason",
    "valueCode": "unknown"
  }]
}</code></pre>

<h2>Extension Data Types</h2>

<p>Extensions can use any FHIR data type:</p>

<ul>
<li><strong>valueString</strong>: Simple text</li>
<li><strong>valueInteger</strong>: Whole numbers</li>
<li><strong>valueDecimal</strong>: Decimal numbers</li>
<li><strong>valueBoolean</strong>: true/false</li>
<li><strong>valueDate</strong>: Dates</li>
<li><strong>valueDateTime</strong>: Date and time</li>
<li><strong>valueCode</strong>: Coded value</li>
<li><strong>valueCodeableConcept</strong>: Coded concept with system</li>
<li><strong>valueReference</strong>: Reference to another resource</li>
</ul>

<h2>Best Practices</h2>

<h3>1. Use Standard Extensions First</h3>

<p>Check if a standard extension exists before creating a custom one:</p>
<ul>
<li>US Core extensions</li>
<li>FHIR core extensions</li>
<li>IGs from other jurisdictions</li>
</ul>

<h3>2. Define Clear URLs</h3>

<p>Use a namespace you control for extension URLs.</p>

<pre><code>http://[your-domain]/fhir/StructureDefinition/[extension-name]</code></pre>

<h3>3. Document Extensions</h3>

<p>Provide clear documentation:</p>
<ul>
<li>Purpose and use case</li>
<li>Data type and constraints</li>
<li>Examples</li>
</ul>

<h3>4. Version Extensions</h3>

<p>Include version in URL for breaking changes.</p>

<pre><code>http://example.org/fhir/StructureDefinition/patient-score/v2</code></pre>

<h3>5. Validate Extension Usage</h3>

<pre><code class="language-python">def validate_extension(resource, extension_url):
    extensions = resource.extension or []
    matching = [e for e in extensions if e.url == extension_url]
    return len(matching) > 0</code></pre>

<h2>Mapping Extensions</h2>

<h3>From CSV</h3>
<pre><code class="language-python">def add_race_extension(patient, race_code):
    if not patient.extension:
        patient.extension = []

    patient.extension.append({
        "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
        "extension": [{
            "url": "ombCategory",
            "valueCoding": {
                "system": "urn:oid:2.16.840.1.113883.6.238",
                "code": race_code,
                "display": get_race_display(race_code)
            }
        }, {
            "url": "text",
            "valueString": get_race_display(race_code)
        }]
    })</code></pre>

<h2>Extension Registry</h2>

<ul>
<li><strong>US Core</strong>: <a href="http://hl7.org/fhir/us/core/" target="_blank">http://hl7.org/fhir/us/core/</a></li>
<li><strong>FHIR Core Extensions</strong>: <a href="http://hl7.org/fhir/extensions/" target="_blank">http://hl7.org/fhir/extensions/</a></li>
<li><strong>Simplifier</strong>: <a href="https://simplifier.net/" target="_blank">https://simplifier.net/</a> (search for extensions)</li>
</ul>

<h2>Resources</h2>

<ul>
<li><a href="http://hl7.org/fhir/extensibility.html" target="_blank">FHIR Extensions Documentation</a></li>
<li><a href="http://hl7.org/fhir/us/core/profiles-and-extensions.html" target="_blank">US Core Extensions</a></li>
</ul>
        `
    },

    'performance': {
        title: 'Performance Optimization',
        content: `
<h1>Performance Optimization</h1>

<p>Strategies for optimizing FHIR data mapping and processing pipelines.</p>

<h2>Performance Challenges</h2>

<p>Common bottlenecks in FHIR mapping:</p>

<ul>
<li><strong>Large Dataset Processing</strong>: Processing millions of records</li>
<li><strong>Complex Transformations</strong>: Multi-step mapping logic</li>
<li><strong>Validation Overhead</strong>: Validating every resource</li>
<li><strong>Network Latency</strong>: API calls to FHIR servers</li>
<li><strong>Memory Constraints</strong>: Large resources and bundles</li>
</ul>

<h2>Optimization Strategies</h2>

<h3>1. Batch Processing</h3>

<p>Process records in batches instead of one-by-one.</p>

<pre><code class="language-python">import polars as pl

def batch_process_observations(csv_path, batch_size=1000):
    """Process CSV in batches for better memory efficiency"""
    df = pl.read_csv(csv_path)
    total_rows = len(df)

    for i in range(0, total_rows, batch_size):
        batch = df[i:i+batch_size]
        observations = []

        for row in batch.iter_rows(named=True):
            obs = create_observation(row)
            observations.append(obs)

        # Send batch to FHIR server
        upload_batch(observations)

        print(f"Processed {min(i+batch_size, total_rows)}/{total_rows}")</code></pre>

<h3>2. Parallel Processing</h3>

<p>Use multiprocessing for CPU-intensive tasks.</p>

<pre><code class="language-python">from multiprocessing import Pool
import os

def process_chunk(chunk_data):
    """Process a chunk of data"""
    return [create_fhir_resource(row) for row in chunk_data]

def parallel_process(data, num_workers=None):
    """Process data in parallel"""
    if num_workers is None:
        num_workers = os.cpu_count()

    # Split data into chunks
    chunk_size = len(data) // num_workers
    chunks = [data[i:i+chunk_size] for i in range(0, len(data), chunk_size)]

    # Process in parallel
    with Pool(num_workers) as pool:
        results = pool.map(process_chunk, chunks)

    # Flatten results
    return [item for sublist in results for item in sublist]

# Usage
resources = parallel_process(input_data, num_workers=4)</code></pre>

<h3>3. Use Polars Instead of Pandas</h3>

<p>Polars is significantly faster for large datasets.</p>

<pre><code class="language-python">import polars as pl

# Polars is 10-30x faster than pandas
df = pl.read_csv("large_file.csv")

# Lazy evaluation for better performance
lazy_df = pl.scan_csv("large_file.csv")
result = (lazy_df
    .filter(pl.col("status") == "final")
    .select(["patient_id", "value", "date"])
    .collect())</code></pre>

<p><strong>Performance Comparison:</strong></p>
<table>
<thead>
<tr>
<th>Operation</th>
<th>Pandas</th>
<th>Polars</th>
<th>Speedup</th>
</tr>
</thead>
<tbody>
<tr>
<td>Read 1M rows</td>
<td>2.5s</td>
<td>0.3s</td>
<td>8.3x</td>
</tr>
<tr>
<td>Filter</td>
<td>0.8s</td>
<td>0.1s</td>
<td>8x</td>
</tr>
<tr>
<td>Group by</td>
<td>1.2s</td>
<td>0.15s</td>
<td>8x</td>
</tr>
</tbody>
</table>

<h3>4. Optimize Validation</h3>

<p>Don't validate every resource if unnecessary.</p>

<pre><code class="language-python">def smart_validation(resources, sample_rate=0.1):
    """Validate a sample instead of all resources"""
    import random

    # Validate first resource fully
    validate_fhir(resources[0])

    # Sample remaining resources
    sample_size = int(len(resources) * sample_rate)
    sample = random.sample(resources[1:], sample_size)

    for resource in sample:
        validate_fhir(resource)

    return resources</code></pre>

<h3>5. Caching</h3>

<p>Cache expensive lookups and transformations.</p>

<pre><code class="language-python">from functools import lru_cache

@lru_cache(maxsize=1000)
def get_loinc_display(code):
    """Cache LOINC code lookups"""
    return terminology_service.lookup(code)

@lru_cache(maxsize=100)
def load_mapping_config(config_path):
    """Cache mapping configuration"""
    with open(config_path) as f:
        return yaml.safe_load(f)</code></pre>

<h3>6. Lazy Loading</h3>

<p>Load data only when needed.</p>

<pre><code class="language-python">class LazyFHIRResource:
    def __init__(self, data):
        self._data = data
        self._resource = None

    @property
    def resource(self):
        if self._resource is None:
            self._resource = create_fhir_resource(self._data)
        return self._resource</code></pre>

<h3>7. Optimize Bundle Creation</h3>

<p>Use transaction bundles for bulk uploads.</p>

<pre><code class="language-python">def create_transaction_bundle(resources, batch_size=100):
    """Create optimized transaction bundles"""
    from fhir.resources.bundle import Bundle, BundleEntry

    bundles = []
    for i in range(0, len(resources), batch_size):
        batch = resources[i:i+batch_size]

        entries = [
            BundleEntry(
                resource=resource,
                request={
                    "method": "POST",
                    "url": resource.resource_type
                }
            ) for resource in batch
        ]

        bundle = Bundle(type="transaction", entry=entries)
        bundles.append(bundle)

    return bundles</code></pre>

<h3>8. Database Optimization</h3>

<p>Use efficient queries when working with databases.</p>

<pre><code class="language-python"># Bad - N+1 query problem
for patient_id in patient_ids:
    observations = db.query(Observation).filter_by(patient_id=patient_id).all()
    process(observations)

# Good - Single bulk query
observations = db.query(Observation).filter(
    Observation.patient_id.in_(patient_ids)
).all()
observations_by_patient = group_by_patient(observations)</code></pre>

<h3>9. Streaming for Large Files</h3>

<p>Process large files without loading entirely into memory.</p>

<pre><code class="language-python">def stream_process_ndjson(file_path):
    """Stream process NDJSON file"""
    with open(file_path, 'r') as f:
        for line in f:
            resource = json.loads(line)
            yield process_resource(resource)

# Usage
for processed in stream_process_ndjson("large_file.ndjson"):
    upload_to_server(processed)</code></pre>

<h3>10. Async Operations</h3>

<p>Use async/await for I/O-bound operations.</p>

<pre><code class="language-python">import asyncio
import aiohttp

async def upload_resource(session, resource):
    """Async upload to FHIR server"""
    async with session.post(
        f"{FHIR_BASE_URL}/{resource.resource_type}",
        json=resource.dict()
    ) as response:
        return await response.json()

async def bulk_upload(resources):
    """Upload many resources concurrently"""
    async with aiohttp.ClientSession() as session:
        tasks = [upload_resource(session, r) for r in resources]
        results = await asyncio.gather(*tasks)
        return results

# Usage
results = asyncio.run(bulk_upload(observations))</code></pre>

<h2>Monitoring Performance</h2>

<h3>Timing Operations</h3>

<pre><code class="language-python">import time
from contextlib import contextmanager

@contextmanager
def timer(name):
    start = time.time()
    yield
    duration = time.time() - start
    print(f"{name}: {duration:.2f}s")

# Usage
with timer("CSV Processing"):
    df = pl.read_csv("data.csv")

with timer("FHIR Mapping"):
    resources = map_to_fhir(df)

with timer("Validation"):
    validate_all(resources)</code></pre>

<h3>Memory Profiling</h3>

<pre><code class="language-python">from memory_profiler import profile

@profile
def process_large_dataset():
    df = pl.read_csv("large_file.csv")
    resources = map_to_fhir(df)
    return resources</code></pre>

<h2>Benchmarking</h2>

<pre><code class="language-python">import timeit

# Compare different approaches
pandas_time = timeit.timeit(
    'process_with_pandas(df)',
    globals=globals(),
    number=10
)

polars_time = timeit.timeit(
    'process_with_polars(df)',
    globals=globals(),
    number=10
)

print(f"Pandas: {pandas_time:.2f}s")
print(f"Polars: {polars_time:.2f}s")
print(f"Speedup: {pandas_time/polars_time:.1f}x")</code></pre>

<h2>Best Practices</h2>

<ol>
<li><strong>Profile First</strong>: Measure before optimizing</li>
<li><strong>Optimize Bottlenecks</strong>: Focus on the slowest parts</li>
<li><strong>Batch Operations</strong>: Process in chunks</li>
<li><strong>Use Efficient Libraries</strong>: Polars &gt; Pandas for large data</li>
<li><strong>Cache Lookups</strong>: Avoid repeated expensive operations</li>
<li><strong>Parallel Processing</strong>: Utilize multiple cores</li>
<li><strong>Streaming</strong>: Don't load entire files into memory</li>
<li><strong>Async I/O</strong>: Concurrent network operations</li>
<li><strong>Monitor Memory</strong>: Watch for memory leaks</li>
<li><strong>Benchmark Regularly</strong>: Track performance over time</li>
</ol>

<h2>Performance Targets</h2>

<table>
<thead>
<tr>
<th>Operation</th>
<th>Target</th>
<th>Good</th>
<th>Excellent</th>
</tr>
</thead>
<tbody>
<tr>
<td>Process 1K rows</td>
<td>&lt; 10s</td>
<td>&lt; 5s</td>
<td>&lt; 1s</td>
</tr>
<tr>
<td>Process 100K rows</td>
<td>&lt; 5min</td>
<td>&lt; 2min</td>
<td>&lt; 30s</td>
</tr>
<tr>
<td>Validate resource</td>
<td>&lt; 100ms</td>
<td>&lt; 50ms</td>
<td>&lt; 10ms</td>
</tr>
<tr>
<td>API request</td>
<td>&lt; 1s</td>
<td>&lt; 500ms</td>
<td>&lt; 200ms</td>
</tr>
</tbody>
</table>
        `
    },

    'api-reference': {
        title: 'API Reference',
        content: `
<h1>API Reference</h1>

<p>Quick reference for FHIR REST API operations and common patterns.</p>

<h2>Base URL Structure</h2>

<pre><code>[base]/[type]/[id] {?_format=[mime-type]}</code></pre>

<p>Example:</p>
<pre><code>https://hapi.fhir.org/baseR4/Patient/123</code></pre>

<h2>HTTP Operations</h2>

<h3>Create (POST)</h3>

<p>Create a new resource.</p>

<pre><code class="language-http">POST [base]/Patient
Content-Type: application/fhir+json

{
  "resourceType": "Patient",
  "name": [{"family": "Smith", "given": ["John"]}]
}</code></pre>

<p><strong>Response:</strong></p>
<pre><code class="language-http">HTTP/1.1 201 Created
Location: http://example.org/fhir/Patient/123/_history/1</code></pre>

<h3>Read (GET)</h3>

<p>Retrieve a specific resource.</p>

<pre><code class="language-http">GET [base]/Patient/123
Accept: application/fhir+json</code></pre>

<p><strong>Response:</strong></p>
<pre><code class="language-json">{
  "resourceType": "Patient",
  "id": "123",
  "meta": {
    "versionId": "1",
    "lastUpdated": "2024-01-15T10:00:00Z"
  },
  "name": [{"family": "Smith", "given": ["John"]}]
}</code></pre>

<h3>Update (PUT)</h3>

<p>Update an existing resource.</p>

<pre><code class="language-http">PUT [base]/Patient/123
Content-Type: application/fhir+json

{
  "resourceType": "Patient",
  "id": "123",
  "name": [{"family": "Smith", "given": ["John", "David"]}]
}</code></pre>

<h3>Patch (PATCH)</h3>

<p>Partially update a resource.</p>

<pre><code class="language-http">PATCH [base]/Patient/123
Content-Type: application/json-patch+json

[
  {
    "op": "replace",
    "path": "/name/0/given/0",
    "value": "Jonathan"
  }
]</code></pre>

<h3>Delete (DELETE)</h3>

<p>Delete a resource.</p>

<pre><code class="language-http">DELETE [base]/Patient/123</code></pre>

<h2>Search</h2>

<h3>Basic Search</h3>

<pre><code class="language-http">GET [base]/Patient?family=Smith</code></pre>

<h3>Common Search Parameters</h3>

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Example</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>_id</td>
<td>?_id=123</td>
<td>Search by ID</td>
</tr>
<tr>
<td>_lastUpdated</td>
<td>?_lastUpdated=gt2024-01-01</td>
<td>Modified after date</td>
</tr>
<tr>
<td>_tag</td>
<td>?_tag=http://example.org|test</td>
<td>Search by tag</td>
</tr>
<tr>
<td>_profile</td>
<td>?_profile=http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient</td>
<td>Search by profile</td>
</tr>
<tr>
<td>_sort</td>
<td>?_sort=-date</td>
<td>Sort results</td>
</tr>
<tr>
<td>_count</td>
<td>?_count=50</td>
<td>Page size</td>
</tr>
<tr>
<td>_include</td>
<td>?_include=Patient:organization</td>
<td>Include related resources</td>
</tr>
</tbody>
</table>

<h3>Patient Search Parameters</h3>

<pre><code class="language-http"># By name
GET [base]/Patient?family=Smith&amp;given=John

# By identifier
GET [base]/Patient?identifier=http://hospital.org/mrn|12345

# By birthdate
GET [base]/Patient?birthdate=1990-01-15

# By gender
GET [base]/Patient?gender=male

# Combined
GET [base]/Patient?family=Smith&amp;birthdate=ge1990-01-01&amp;_sort=family</code></pre>

<h3>Observation Search</h3>

<pre><code class="language-http"># By patient
GET [base]/Observation?patient=Patient/123

# By code
GET [base]/Observation?code=http://loinc.org|718-7

# By date range
GET [base]/Observation?date=ge2024-01-01&amp;date=le2024-12-31

# By value
GET [base]/Observation?value-quantity=gt100

# Combined
GET [base]/Observation?patient=Patient/123&amp;code=718-7&amp;date=ge2024-01-01</code></pre>

<h3>Search Modifiers</h3>

<pre><code class="language-http"># Exact match
GET [base]/Patient?name:exact=John Smith

# Contains
GET [base]/Patient?name:contains=Smith

# Text search
GET [base]/Patient?_text=diabetes

# Missing
GET [base]/Patient?gender:missing=true</code></pre>

<h3>Search Prefixes</h3>

<p>For numbers and dates:</p>

<ul>
<li><strong>eq</strong>: Equal (default)</li>
<li><strong>ne</strong>: Not equal</li>
<li><strong>gt</strong>: Greater than</li>
<li><strong>lt</strong>: Less than</li>
<li><strong>ge</strong>: Greater or equal</li>
<li><strong>le</strong>: Less or equal</li>
</ul>

<pre><code class="language-http">GET [base]/Observation?value-quantity=gt100
GET [base]/Observation?date=ge2024-01-01</code></pre>

<h2>Batch and Transaction</h2>

<h3>Batch Bundle</h3>

<pre><code class="language-json">{
  "resourceType": "Bundle",
  "type": "batch",
  "entry": [{
    "request": {
      "method": "POST",
      "url": "Patient"
    },
    "resource": {
      "resourceType": "Patient",
      "name": [{"family": "Smith"}]
    }
  }, {
    "request": {
      "method": "GET",
      "url": "Patient?family=Jones"
    }
  }]
}</code></pre>

<h3>Transaction Bundle</h3>

<pre><code class="language-json">{
  "resourceType": "Bundle",
  "type": "transaction",
  "entry": [{
    "fullUrl": "urn:uuid:patient-1",
    "request": {
      "method": "POST",
      "url": "Patient"
    },
    "resource": {
      "resourceType": "Patient"
    }
  }, {
    "request": {
      "method": "POST",
      "url": "Observation"
    },
    "resource": {
      "resourceType": "Observation",
      "subject": {
        "reference": "urn:uuid:patient-1"
      }
    }
  }]
}</code></pre>

<h2>Python Examples</h2>

<h3>Using requests</h3>

<pre><code class="language-python">import requests

BASE_URL = "https://hapi.fhir.org/baseR4"
headers = {"Content-Type": "application/fhir+json"}

# Create
response = requests.post(
    f"{BASE_URL}/Patient",
    json=patient_resource,
    headers=headers
)
print(response.status_code)  # 201
location = response.headers['Location']

# Read
response = requests.get(f"{BASE_URL}/Patient/123")
patient = response.json()

# Search
response = requests.get(
    f"{BASE_URL}/Patient",
    params={"family": "Smith", "_count": 10}
)
bundle = response.json()

# Update
response = requests.put(
    f"{BASE_URL}/Patient/123",
    json=updated_patient,
    headers=headers
)

# Delete
response = requests.delete(f"{BASE_URL}/Patient/123")</code></pre>

<h3>Using fhirclient</h3>

<pre><code class="language-python">from fhirclient import client

settings = {
    'app_id': 'my_app',
    'api_base': 'https://hapi.fhir.org/baseR4'
}

smart = client.FHIRClient(settings=settings)

# Search
import fhirclient.models.patient as p
search = p.Patient.where(struct={'family': 'Smith'})
patients = search.perform_resources(smart.server)

# Read
patient = p.Patient.read('123', smart.server)
print(patient.name[0].family)</code></pre>

<h2>Response Codes</h2>

<table>
<thead>
<tr>
<th>Code</th>
<th>Meaning</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>200</td>
<td>OK</td>
<td>Successful read</td>
</tr>
<tr>
<td>201</td>
<td>Created</td>
<td>Resource created</td>
</tr>
<tr>
<td>204</td>
<td>No Content</td>
<td>Successful delete</td>
</tr>
<tr>
<td>400</td>
<td>Bad Request</td>
<td>Invalid request</td>
</tr>
<tr>
<td>401</td>
<td>Unauthorized</td>
<td>Authentication required</td>
</tr>
<tr>
<td>403</td>
<td>Forbidden</td>
<td>Insufficient permissions</td>
</tr>
<tr>
<td>404</td>
<td>Not Found</td>
<td>Resource not found</td>
</tr>
<tr>
<td>409</td>
<td>Conflict</td>
<td>Version conflict</td>
</tr>
<tr>
<td>422</td>
<td>Unprocessable Entity</td>
<td>Validation error</td>
</tr>
<tr>
<td>500</td>
<td>Server Error</td>
<td>Internal server error</td>
</tr>
</tbody>
</table>

<h2>Common Headers</h2>

<h3>Request Headers</h3>

<pre><code class="language-http">Content-Type: application/fhir+json
Accept: application/fhir+json
Authorization: Bearer [token]
If-Match: W/"3"
Prefer: return=representation</code></pre>

<h3>Response Headers</h3>

<pre><code class="language-http">Location: http://example.org/fhir/Patient/123/_history/1
ETag: W/"1"
Last-Modified: Mon, 15 Jan 2024 10:00:00 GMT</code></pre>

<h2>Resources</h2>

<ul>
<li><a href="http://hl7.org/fhir/http.html" target="_blank">FHIR RESTful API</a></li>
<li><a href="http://hl7.org/fhir/search.html" target="_blank">FHIR Search</a></li>
<li><a href="https://hapifhir.io/" target="_blank">HAPI FHIR Server</a></li>
</ul>
        `
    },

    'fhir-versions': {
        title: 'FHIR Versions',
        content: `
<h1>FHIR Versions</h1>

<p>Understanding FHIR versions and migration strategies.</p>

<h2>FHIR Version History</h2>

<table>
<thead>
<tr>
<th>Version</th>
<th>Release</th>
<th>Status</th>
<th>Common Use</th>
</tr>
</thead>
<tbody>
<tr>
<td>DSTU2</td>
<td>2015</td>
<td>Retired</td>
<td>Legacy systems</td>
</tr>
<tr>
<td>STU3</td>
<td>2017</td>
<td>Mature</td>
<td>Some production</td>
</tr>
<tr>
<td>R4</td>
<td>2019</td>
<td><strong>Normative</strong></td>
<td><strong>Current standard</strong></td>
</tr>
<tr>
<td>R4B</td>
<td>2022</td>
<td>Normative</td>
<td>Updates to R4</td>
</tr>
<tr>
<td>R5</td>
<td>2023</td>
<td>Trial Use</td>
<td>Future/Testing</td>
</tr>
</tbody>
</table>

<h2>Current Recommendation: R4</h2>

<p><strong>FHIR R4</strong> is the current normative version and recommended for all new implementations.</p>

<h3>Why R4?</h3>

<ul>
<li>Normative status (stable, no breaking changes)</li>
<li>Wide industry adoption</li>
<li>US Core 3.1+ based on R4</li>
<li>Best tooling support</li>
<li>Mature implementation guides</li>
</ul>

<h2>Version Differences</h2>

<h3>DSTU2 vs R4</h3>

<p>Major changes between DSTU2 and R4:</p>

<p><strong>Patient Resource</strong></p>
<pre><code class="language-json">// DSTU2
{
  "name": {
    "family": ["Smith"],
    "given": ["John"]
  }
}

// R4
{
  "name": [{
    "family": "Smith",
    "given": ["John"]
  }]
}</code></pre>

<p><strong>Observation Status</strong></p>
<ul>
<li>DSTU2: <code>status</code> values different</li>
<li>R4: Standardized status codes</li>
</ul>

<h3>STU3 vs R4</h3>

<p>More minor changes:</p>

<p><strong>CodeableConcept</strong></p>
<ul>
<li>Structure mostly same</li>
<li>Some value sets updated</li>
</ul>

<p><strong>References</strong></p>
<ul>
<li>R4 added <code>identifier</code> to Reference type</li>
</ul>

<h3>R4 vs R5</h3>

<p>R5 introduces new features:</p>

<ul>
<li>New resource types</li>
<li>Enhanced search capabilities</li>
<li>Improved subscription framework</li>
<li>Better support for genomics</li>
</ul>

<h2>Checking FHIR Version</h2>

<h3>From Resource</h3>

<pre><code class="language-json">{
  "resourceType": "Patient",
  "meta": {
    "versionId": "1",
    "lastUpdated": "2024-01-15T10:00:00Z"
  },
  "fhirVersion": "4.0.1"
}</code></pre>

<h3>From CapabilityStatement</h3>

<pre><code class="language-http">GET [base]/metadata</code></pre>

<pre><code class="language-json">{
  "resourceType": "CapabilityStatement",
  "fhirVersion": "4.0.1",
  "format": ["application/fhir+json"]
}</code></pre>

<h3>In Python</h3>

<pre><code class="language-python">from fhir.resources import FHIRAbstractModel

# Check library version
print(FHIRAbstractModel.fhir_release())  # R4

# Specify version when creating
from fhir.resources.patient import Patient
patient = Patient()  # Defaults to R4</code></pre>

<h2>Migration Strategies</h2>

<h3>DSTU2 to R4</h3>

<p><strong>1. Identify Breaking Changes</strong></p>
<ul>
<li>Name structure (array vs object)</li>
<li>Status codes</li>
<li>Removed elements</li>
</ul>

<p><strong>2. Update Code</strong></p>
<pre><code class="language-python">def migrate_dstu2_to_r4_patient(dstu2_patient):
    """Migrate DSTU2 Patient to R4"""
    r4_patient = {
        "resourceType": "Patient",
        "id": dstu2_patient["id"]
    }

    # Migrate name (DSTU2 has different structure)
    if "name" in dstu2_patient:
        dstu2_name = dstu2_patient["name"]
        r4_patient["name"] = [{
            "family": dstu2_name["family"][0] if isinstance(dstu2_name.get("family"), list) else dstu2_name.get("family"),
            "given": dstu2_name.get("given", [])
        }]

    # Copy other fields that are compatible
    for field in ["birthDate", "gender", "telecom", "address"]:
        if field in dstu2_patient:
            r4_patient[field] = dstu2_patient[field]

    return r4_patient</code></pre>

<p><strong>3. Test Thoroughly</strong></p>
<ul>
<li>Validate migrated resources</li>
<li>Test with actual FHIR R4 server</li>
<li>Check all resource types</li>
</ul>

<p><strong>4. Migrate Data</strong></p>
<ul>
<li>Export from DSTU2 server</li>
<li>Transform resources</li>
<li>Import to R4 server</li>
</ul>

<h3>Version-Agnostic Code</h3>

<p>Write code that handles multiple versions:</p>

<pre><code class="language-python">def get_patient_family_name(patient_resource):
    """Get family name regardless of FHIR version"""
    name = patient_resource.get("name")

    # Handle R4 (array)
    if isinstance(name, list) and len(name) > 0:
        return name[0].get("family")

    # Handle DSTU2 (object)
    elif isinstance(name, dict):
        family = name.get("family")
        if isinstance(family, list):
            return family[0]
        return family

    return None</code></pre>

<h2>Version-Specific Validation</h2>

<pre><code class="language-bash"># Validate against specific version
java -jar validator_cli.jar patient.json -version 4.0.1

# Validate against DSTU2
java -jar validator_cli.jar patient.json -version 1.0.2

# Validate against R5
java -jar validator_cli.jar patient.json -version 5.0.0</code></pre>

<h2>US Core Versions</h2>

<p>US Core versions are tied to FHIR versions:</p>

<table>
<thead>
<tr>
<th>US Core</th>
<th>FHIR Version</th>
<th>Status</th>
</tr>
</thead>
<tbody>
<tr>
<td>3.1.1</td>
<td>R4</td>
<td>Current</td>
</tr>
<tr>
<td>4.0.0</td>
<td>R4</td>
<td>Latest</td>
</tr>
<tr>
<td>5.0.1</td>
<td>R4</td>
<td>Latest</td>
</tr>
<tr>
<td>6.1.0</td>
<td>R4</td>
<td>Current STU</td>
</tr>
</tbody>
</table>

<h2>Implementation Guides</h2>

<p>Check IG FHIR version requirements:</p>

<pre><code class="language-json">{
  "resourceType": "ImplementationGuide",
  "fhirVersion": ["4.0.1"],
  "dependsOn": [{
    "uri": "http://hl7.org/fhir/us/core/ImplementationGuide/hl7.fhir.us.core",
    "version": "3.1.1"
  }]
}</code></pre>

<h2>Best Practices</h2>

<h3>1. Stay on R4</h3>

<p>Unless you have a specific reason, use R4:</p>
<ul>
<li>Most stable</li>
<li>Best support</li>
<li>Required for US Core</li>
</ul>

<h3>2. Check Dependencies</h3>

<p>Ensure all IGs and profiles support your FHIR version.</p>

<h3>3. Version in URLs</h3>

<p>Include version in profile URLs:</p>
<pre><code>http://hl7.org/fhir/4.0/StructureDefinition/Patient</code></pre>

<h3>4. Test Cross-Version</h3>

<p>If supporting multiple versions, test against each.</p>

<h3>5. Document Version Requirements</h3>

<p>In your documentation, clearly state:</p>
<ul>
<li>Supported FHIR versions</li>
<li>Recommended version</li>
<li>Migration path</li>
</ul>

<h2>Future-Proofing</h2>

<h3>Monitor R5</h3>

<p>R5 introduces:</p>
<ul>
<li>Better subscriptions</li>
<li>Expanded CodeableConcept</li>
<li>New resource types</li>
</ul>

<h3>Plan for Migration</h3>

<ul>
<li>Keep up with announcements</li>
<li>Test with R5 preview</li>
<li>Plan migration timeline</li>
</ul>

<h2>Resources</h2>

<ul>
<li><a href="http://hl7.org/fhir/history.html" target="_blank">FHIR Version History</a></li>
<li><a href="http://hl7.org/fhir/R4/" target="_blank">R4 Specification</a></li>
<li><a href="http://hl7.org/fhir/R5/" target="_blank">R5 Preview</a></li>
<li><a href="https://www.hl7.org/fhir/comparison.html" target="_blank">Version Comparison Tool</a></li>
</ul>
        `
    },

    'glossary': {
        title: 'FHIR Glossary',
        content: `
<h1>FHIR Glossary</h1>

<p>Common FHIR terms and acronyms explained.</p>

<h2>A</h2>

<p><strong>API (Application Programming Interface)</strong><br>
Interface for software to interact with FHIR servers.</p>

<h2>B</h2>

<p><strong>Bundle</strong><br>
A collection of resources grouped together for transport or storage.</p>

<p><strong>Base URL</strong><br>
The root URL of a FHIR server (e.g., https://example.org/fhir).</p>

<h2>C</h2>

<p><strong>C-CDA (Consolidated Clinical Document Architecture)</strong><br>
HL7 standard for clinical documents, often mapped to FHIR.</p>

<p><strong>Capability Statement</strong><br>
Resource describing what a FHIR server can do.</p>

<p><strong>Cardinality</strong><br>
How many times an element can appear (0..1, 1..1, 0..*, 1..*).</p>

<p><strong>Code</strong><br>
A symbol defined by a terminology system.</p>

<p><strong>CodeableConcept</strong><br>
A value represented by codes from one or more terminologies.</p>

<p><strong>Coding</strong><br>
A single code from a terminology system.</p>

<p><strong>Conformance</strong><br>
How well an implementation matches FHIR specifications.</p>

<p><strong>Contained Resource</strong><br>
Resource embedded inside another resource.</p>

<h2>D</h2>

<p><strong>DSTU (Draft Standard for Trial Use)</strong><br>
Early FHIR versions (DSTU1, DSTU2).</p>

<h2>E</h2>

<p><strong>Element</strong><br>
A single data field in a FHIR resource.</p>

<p><strong>EHR (Electronic Health Record)</strong><br>
Digital patient health information system.</p>

<p><strong>Extension</strong><br>
Additional data not in base FHIR specification.</p>

<h2>F</h2>

<p><strong>FHIR (Fast Healthcare Interoperability Resources)</strong><br>
HL7 standard for healthcare data exchange.</p>

<p><strong>FHIRPath</strong><br>
Query language for navigating FHIR resources.</p>

<p><strong>FSH (FHIR Shorthand)</strong><br>
Domain-specific language for defining FHIR artifacts.</p>

<h2>H</h2>

<p><strong>HL7 (Health Level Seven)</strong><br>
International standards organization for healthcare IT.</p>

<p><strong>HAPI FHIR</strong><br>
Popular open-source FHIR server and library.</p>

<h2>I</h2>

<p><strong>Identifier</strong><br>
Unique ID for a resource or entity.</p>

<p><strong>IG (Implementation Guide)</strong><br>
Documentation for using FHIR in specific contexts.</p>

<p><strong>Interoperability</strong><br>
Ability of systems to exchange and use information.</p>

<h2>L</h2>

<p><strong>LOINC (Logical Observation Identifiers Names and Codes)</strong><br>
Standard for lab and clinical observations.</p>

<h2>M</h2>

<p><strong>Mapping</strong><br>
Transformation from one data format to FHIR.</p>

<p><strong>Meta</strong><br>
Metadata about a resource (version, profile, tags).</p>

<p><strong>Modifier Extension</strong><br>
Extension that changes the meaning of a resource.</p>

<h2>N</h2>

<p><strong>Narrative</strong><br>
Human-readable summary of a resource.</p>

<p><strong>NDJSON (Newline Delimited JSON)</strong><br>
Format for bulk FHIR data (one resource per line).</p>

<p><strong>Normative</strong><br>
Stable FHIR specification that won't have breaking changes.</p>

<h2>O</h2>

<p><strong>Observation</strong><br>
FHIR resource for measurements and assertions.</p>

<h2>P</h2>

<p><strong>Patient</strong><br>
FHIR resource representing an individual receiving care.</p>

<p><strong>Profile</strong><br>
Constraints on base FHIR resources for specific use cases.</p>

<p><strong>Practitioner</strong><br>
FHIR resource for healthcare providers.</p>

<h2>Q</h2>

<p><strong>Quantity</strong><br>
Numerical value with unit of measure.</p>

<h2>R</h2>

<p><strong>R4</strong><br>
Current normative version of FHIR (4.0).</p>

<p><strong>Reference</strong><br>
Link from one resource to another.</p>

<p><strong>Resource</strong><br>
Basic unit of interoperability in FHIR.</p>

<p><strong>REST (Representational State Transfer)</strong><br>
API architectural style used by FHIR.</p>

<p><strong>RxNorm</strong><br>
Standard for medications and drugs.</p>

<h2>S</h2>

<p><strong>Search Parameter</strong><br>
Query criteria for finding FHIR resources.</p>

<p><strong>SNOMED CT</strong><br>
Comprehensive clinical terminology system.</p>

<p><strong>STU (Standard for Trial Use)</strong><br>
FHIR version in testing (STU3).</p>

<p><strong>StructureDefinition</strong><br>
Defines the structure of resources and profiles.</p>

<p><strong>StructureMap</strong><br>
FHIR resource for defining data transformations.</p>

<h2>T</h2>

<p><strong>Terminology</strong><br>
Systems of codes and concepts (LOINC, SNOMED, etc.).</p>

<p><strong>Transaction</strong><br>
Atomic bundle of operations that succeed or fail together.</p>

<h2>U</h2>

<p><strong>UCUM (Unified Code for Units of Measure)</strong><br>
Standard for units of measurement.</p>

<p><strong>US Core</strong><br>
US-specific FHIR profiles and requirements.</p>

<p><strong>USCDI (United States Core Data for Interoperability)</strong><br>
Standardized set of health data classes and elements.</p>

<h2>V</h2>

<p><strong>Validation</strong><br>
Checking if resources conform to FHIR specifications.</p>

<p><strong>Value Set</strong><br>
Set of codes from one or more terminologies.</p>

<p><strong>Version</strong><br>
Specific release of FHIR (DSTU2, STU3, R4, R5).</p>

<h2>Common Acronyms</h2>

<ul>
<li><strong>API</strong>: Application Programming Interface</li>
<li><strong>C-CDA</strong>: Consolidated Clinical Document Architecture</li>
<li><strong>CMS</strong>: Centers for Medicare &amp; Medicaid Services</li>
<li><strong>DSTU</strong>: Draft Standard for Trial Use</li>
<li><strong>EHR</strong>: Electronic Health Record</li>
<li><strong>FHIR</strong>: Fast Healthcare Interoperability Resources</li>
<li><strong>FSH</strong>: FHIR Shorthand</li>
<li><strong>HL7</strong>: Health Level Seven</li>
<li><strong>HIPAA</strong>: Health Insurance Portability and Accountability Act</li>
<li><strong>ICD</strong>: International Classification of Diseases</li>
<li><strong>IG</strong>: Implementation Guide</li>
<li><strong>JSON</strong>: JavaScript Object Notation</li>
<li><strong>LOINC</strong>: Logical Observation Identifiers Names and Codes</li>
<li><strong>NDJSON</strong>: Newline Delimited JSON</li>
<li><strong>ONC</strong>: Office of the National Coordinator for Health IT</li>
<li><strong>REST</strong>: Representational State Transfer</li>
<li><strong>RxNorm</strong>: Normalized naming system for medications</li>
<li><strong>SMART</strong>: Substitutable Medical Applications, Reusable Technologies</li>
<li><strong>SNOMED</strong>: Systematized Nomenclature of Medicine</li>
<li><strong>STU</strong>: Standard for Trial Use</li>
<li><strong>UCUM</strong>: Unified Code for Units of Measure</li>
<li><strong>URI</strong>: Uniform Resource Identifier</li>
<li><strong>URL</strong>: Uniform Resource Locator</li>
<li><strong>XML</strong>: Extensible Markup Language</li>
</ul>

<h2>Resource Types Quick Reference</h2>

<table>
<thead>
<tr>
<th>Resource</th>
<th>Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td>Patient</td>
<td>Individual receiving care</td>
</tr>
<tr>
<td>Observation</td>
<td>Measurements and assertions</td>
</tr>
<tr>
<td>Condition</td>
<td>Problems and diagnoses</td>
</tr>
<tr>
<td>Medication</td>
<td>Medication definitions</td>
</tr>
<tr>
<td>MedicationRequest</td>
<td>Prescription orders</td>
</tr>
<tr>
<td>Procedure</td>
<td>Actions performed</td>
</tr>
<tr>
<td>Encounter</td>
<td>Healthcare visits</td>
</tr>
<tr>
<td>Practitioner</td>
<td>Healthcare providers</td>
</tr>
<tr>
<td>Organization</td>
<td>Healthcare organizations</td>
</tr>
<tr>
<td>Location</td>
<td>Physical places</td>
</tr>
<tr>
<td>AllergyIntolerance</td>
<td>Allergies and intolerances</td>
</tr>
<tr>
<td>Immunization</td>
<td>Vaccinations</td>
</tr>
<tr>
<td>DiagnosticReport</td>
<td>Diagnostic test results</td>
</tr>
<tr>
<td>DocumentReference</td>
<td>Clinical documents</td>
</tr>
</tbody>
</table>

<h2>Data Types Quick Reference</h2>

<table>
<thead>
<tr>
<th>Type</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>string</td>
<td>"John Smith"</td>
</tr>
<tr>
<td>integer</td>
<td>42</td>
</tr>
<tr>
<td>decimal</td>
<td>98.6</td>
</tr>
<tr>
<td>boolean</td>
<td>true</td>
</tr>
<tr>
<td>date</td>
<td>"2024-01-15"</td>
</tr>
<tr>
<td>dateTime</td>
<td>"2024-01-15T10:30:00Z"</td>
</tr>
<tr>
<td>code</td>
<td>"male"</td>
</tr>
<tr>
<td>uri</td>
<td>"http://example.org"</td>
</tr>
<tr>
<td>Reference</td>
<td>{"reference": "Patient/123"}</td>
</tr>
<tr>
<td>CodeableConcept</td>
<td>{"coding": [{"system": "...", "code": "..."}]}</td>
</tr>
<tr>
<td>Quantity</td>
<td>{"value": 5, "unit": "mg"}</td>
</tr>
</tbody>
</table>

<h2>See Also</h2>

<ul>
<li><a href="http://hl7.org/fhir/" target="_blank">FHIR Specification</a></li>
<li><a href="http://hl7.org/fhir/us/core/" target="_blank">US Core</a></li>
<li><a href="#intro">FHIR Mapping Guide</a></li>
</ul>
        `
    },

    'us-core-crosswalks': {
        title: 'US Core & CARIN BB Crosswalks',
        content: `
<h1>US Core & CARIN BB Crosswalks</h1>

<p>Resource-by-resource mapping guidance for US Core and CARIN Blue Button (CARIN BB) implementation guides.</p>

<h2>Overview</h2>

<p>This section provides detailed crosswalks for mapping source data to US Core and CARIN BB profiles, including Must Support elements, cardinality requirements, and terminology bindings.</p>

<div class="info-box">
<strong>Must Support Definition:</strong> Elements marked as "Must Support" must be populated if the data is available in the source system. If you don't have the data, you can omit it, but if you have it, you must include it.
</div>

<h2>US Core Patient Crosswalk</h2>

<h3>Profile: US Core Patient (v6.1.0)</h3>

<table>
<thead>
<tr>
<th>Element</th>
<th>Cardinality</th>
<th>Must Support</th>
<th>Terminology</th>
<th>Source Mapping Guidance</th>
</tr>
</thead>
<tbody>
<tr>
<td>identifier</td>
<td>1..*</td>
<td>✓</td>
<td>-</td>
<td>Map MRN, SSN (last 4), or other patient identifiers. Include system URL.</td>
</tr>
<tr>
<td>identifier.system</td>
<td>1..1</td>
<td>✓</td>
<td>-</td>
<td>Use organization-specific URN (e.g., urn:oid:2.16.840.1.113883.4.1 for SSN)</td>
</tr>
<tr>
<td>identifier.value</td>
<td>1..1</td>
<td>✓</td>
<td>-</td>
<td>The actual identifier value</td>
</tr>
<tr>
<td>name</td>
<td>1..*</td>
<td>✓</td>
<td>-</td>
<td>At least one name required. Include family and given.</td>
</tr>
<tr>
<td>name.family</td>
<td>0..1</td>
<td>✓</td>
<td>-</td>
<td>Last name / surname</td>
</tr>
<tr>
<td>name.given</td>
<td>0..*</td>
<td>✓</td>
<td>-</td>
<td>First name, middle name(s)</td>
</tr>
<tr>
<td>telecom</td>
<td>0..*</td>
<td>✓</td>
<td>ContactPointSystem</td>
<td>Phone, email, fax. Include system (phone/email) and value.</td>
</tr>
<tr>
<td>gender</td>
<td>1..1</td>
<td>✓</td>
<td>male | female | other | unknown</td>
<td>Required. Use 'unknown' if not available.</td>
</tr>
<tr>
<td>birthDate</td>
<td>0..1</td>
<td>✓</td>
<td>-</td>
<td>Format: YYYY-MM-DD. Partial dates allowed (YYYY or YYYY-MM).</td>
</tr>
<tr>
<td>address</td>
<td>0..*</td>
<td>✓</td>
<td>-</td>
<td>Street, city, state, postal code, country</td>
</tr>
<tr>
<td>communication</td>
<td>0..*</td>
<td>✓</td>
<td>ValueSet: Languages</td>
<td>Preferred language(s). Use ISO 639-1 codes (en, es, etc.)</td>
</tr>
<tr>
<td>extension: race</td>
<td>0..1</td>
<td>✓</td>
<td>US Core Race</td>
<td>OMB race categories + detailed race codes</td>
</tr>
<tr>
<td>extension: ethnicity</td>
<td>0..1</td>
<td>✓</td>
<td>US Core Ethnicity</td>
<td>Hispanic/Latino ethnicity</td>
</tr>
<tr>
<td>extension: birthsex</td>
<td>0..1</td>
<td>✓</td>
<td>M | F | UNK</td>
<td>Birth sex (different from gender identity)</td>
</tr>
</tbody>
</table>

<h3>Example US Core Patient Mapping</h3>

<pre><code class="language-python">from fhir.resources.patient import Patient
from fhir.resources.extension import Extension
from fhir.resources.coding import Coding

def map_to_us_core_patient(source_data):
    """Map source data to US Core Patient profile"""

    patient = Patient(
        identifier=[{
            "use": "usual",
            "type": {
                "coding": [{
                    "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                    "code": "MR"
                }]
            },
            "system": "urn:oid:2.16.840.1.113883.3.example",
            "value": source_data["mrn"]
        }],
        name=[{
            "use": "official",
            "family": source_data["last_name"],
            "given": [source_data["first_name"], source_data.get("middle_name")]
        }],
        telecom=[
            {
                "system": "phone",
                "value": source_data.get("phone"),
                "use": "home"
            },
            {
                "system": "email",
                "value": source_data.get("email"),
                "use": "home"
            }
        ],
        gender=source_data.get("gender", "unknown"),
        birthDate=source_data["birth_date"],
        address=[{
            "use": "home",
            "line": [source_data.get("street_address")],
            "city": source_data.get("city"),
            "state": source_data.get("state"),
            "postalCode": source_data.get("zip"),
            "country": "US"
        }]
    )

    # Add US Core race extension
    if source_data.get("race"):
        race_ext = Extension(
            url="http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
            extension=[
                {
                    "url": "ombCategory",
                    "valueCoding": {
                        "system": "urn:oid:2.16.840.1.113883.6.238",
                        "code": source_data["race"],
                        "display": get_race_display(source_data["race"])
                    }
                },
                {
                    "url": "text",
                    "valueString": get_race_display(source_data["race"])
                }
            ]
        )
        patient.extension = patient.extension or []
        patient.extension.append(race_ext)

    # Add US Core ethnicity extension
    if source_data.get("ethnicity"):
        ethnicity_ext = Extension(
            url="http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
            extension=[
                {
                    "url": "ombCategory",
                    "valueCoding": {
                        "system": "urn:oid:2.16.840.1.113883.6.238",
                        "code": source_data["ethnicity"],
                        "display": get_ethnicity_display(source_data["ethnicity"])
                    }
                },
                {
                    "url": "text",
                    "valueString": get_ethnicity_display(source_data["ethnicity"])
                }
            ]
        )
        patient.extension = patient.extension or []
        patient.extension.append(ethnicity_ext)

    # Add birth sex extension
    if source_data.get("birth_sex"):
        birthsex_ext = Extension(
            url="http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
            valueCode=source_data["birth_sex"]
        )
        patient.extension = patient.extension or []
        patient.extension.append(birthsex_ext)

    return patient
</code></pre>

<h2>US Core Observation (Lab) Crosswalk</h2>

<h3>Profile: US Core Laboratory Result Observation</h3>

<table>
<thead>
<tr>
<th>Element</th>
<th>Cardinality</th>
<th>Must Support</th>
<th>Terminology</th>
<th>Source Mapping Guidance</th>
</tr>
</thead>
<tbody>
<tr>
<td>status</td>
<td>1..1</td>
<td>✓</td>
<td>registered | preliminary | final | amended +</td>
<td>Result status. Use 'final' for completed results.</td>
</tr>
<tr>
<td>category</td>
<td>1..*</td>
<td>✓</td>
<td>US Core Category</td>
<td>Must include "laboratory". Can add additional categories.</td>
</tr>
<tr>
<td>code</td>
<td>1..1</td>
<td>✓</td>
<td>LOINC (extensible)</td>
<td>Test code. LOINC preferred, local codes allowed with mapping.</td>
</tr>
<tr>
<td>subject</td>
<td>1..1</td>
<td>✓</td>
<td>Reference(US Core Patient)</td>
<td>Patient reference. Must resolve to US Core Patient.</td>
</tr>
<tr>
<td>effectiveDateTime</td>
<td>0..1</td>
<td>✓</td>
<td>-</td>
<td>Specimen collection or observation time. Required if available.</td>
</tr>
<tr>
<td>valueQuantity</td>
<td>0..1</td>
<td>✓</td>
<td>UCUM for units</td>
<td>Numeric result with unit. Use UCUM units (mg/dL, mmol/L, etc.).</td>
</tr>
<tr>
<td>valueCodeableConcept</td>
<td>0..1</td>
<td>✓</td>
<td>SNOMED CT (preferred)</td>
<td>Coded result (e.g., Positive/Negative)</td>
</tr>
<tr>
<td>valueString</td>
<td>0..1</td>
<td>✓</td>
<td>-</td>
<td>Text result when numeric/coded not applicable</td>
</tr>
<tr>
<td>dataAbsentReason</td>
<td>0..1</td>
<td>-</td>
<td>DataAbsentReason</td>
<td>Why value is absent (if no value* present)</td>
</tr>
<tr>
<td>interpretation</td>
<td>0..*</td>
<td>-</td>
<td>ObservationInterpretation</td>
<td>High, Low, Normal, Abnormal, Critical</td>
</tr>
<tr>
<td>referenceRange</td>
<td>0..*</td>
<td>-</td>
<td>-</td>
<td>Normal range (low/high values with units)</td>
</tr>
</tbody>
</table>

<h3>Example Lab Result Mapping</h3>

<pre><code class="language-python">from fhir.resources.observation import Observation

def map_lab_result(lab_data):
    """Map lab result to US Core Lab Observation"""

    obs = Observation(
        status="final",
        category=[{
            "coding": [{
                "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                "code": "laboratory",
                "display": "Laboratory"
            }]
        }],
        code={
            "coding": [{
                "system": "http://loinc.org",
                "code": lab_data["loinc_code"],
                "display": lab_data["test_name"]
            }],
            "text": lab_data["test_name"]
        },
        subject={
            "reference": f"Patient/{lab_data['patient_id']}"
        },
        effectiveDateTime=lab_data["collection_date"],
        valueQuantity={
            "value": lab_data["result_value"],
            "unit": lab_data["unit"],
            "system": "http://unitsofmeasure.org",
            "code": lab_data["ucum_code"]
        }
    )

    # Add interpretation if available
    if lab_data.get("interpretation"):
        obs.interpretation = [{
            "coding": [{
                "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                "code": lab_data["interpretation"],  # "H", "L", "N", etc.
                "display": get_interpretation_display(lab_data["interpretation"])
            }]
        }]

    # Add reference range
    if lab_data.get("ref_range_low") or lab_data.get("ref_range_high"):
        obs.referenceRange = [{
            "low": {
                "value": lab_data.get("ref_range_low"),
                "unit": lab_data["unit"],
                "system": "http://unitsofmeasure.org",
                "code": lab_data["ucum_code"]
            } if lab_data.get("ref_range_low") else None,
            "high": {
                "value": lab_data.get("ref_range_high"),
                "unit": lab_data["unit"],
                "system": "http://unitsofmeasure.org",
                "code": lab_data["ucum_code"]
            } if lab_data.get("ref_range_high") else None
        }]

    return obs
</code></pre>

<h2>CARIN Blue Button (BB) Crosswalks</h2>

<h3>Overview</h3>

<p>CARIN BB is designed for payer-to-member data exchange, focusing on claims, coverage, and explanations of benefit.</p>

<h3>CARIN BB ExplanationOfBenefit (Inpatient)</h3>

<table>
<thead>
<tr>
<th>Element</th>
<th>Cardinality</th>
<th>Must Support</th>
<th>Source Mapping Guidance</th>
</tr>
</thead>
<tbody>
<tr>
<td>identifier</td>
<td>1..*</td>
<td>✓</td>
<td>Claim number/identifier from payer system</td>
</tr>
<tr>
<td>status</td>
<td>1..1</td>
<td>✓</td>
<td>active | cancelled | draft | entered-in-error</td>
</tr>
<tr>
<td>type</td>
<td>1..1</td>
<td>✓</td>
<td>institutional | professional | pharmacy | oral</td>
</tr>
<tr>
<td>use</td>
<td>1..1</td>
<td>✓</td>
<td>claim | preauthorization | predetermination</td>
</tr>
<tr>
<td>patient</td>
<td>1..1</td>
<td>✓</td>
<td>Reference to CARIN BB Patient (member)</td>
</tr>
<tr>
<td>billablePeriod</td>
<td>1..1</td>
<td>✓</td>
<td>Service start and end dates</td>
</tr>
<tr>
<td>created</td>
<td>1..1</td>
<td>✓</td>
<td>Date EOB was created</td>
</tr>
<tr>
<td>insurer</td>
<td>1..1</td>
<td>✓</td>
<td>Reference to payer Organization</td>
</tr>
<tr>
<td>provider</td>
<td>1..1</td>
<td>✓</td>
<td>Billing provider (Practitioner or Organization)</td>
</tr>
<tr>
<td>outcome</td>
<td>1..1</td>
<td>✓</td>
<td>queued | complete | error | partial</td>
</tr>
<tr>
<td>insurance</td>
<td>1..*</td>
<td>✓</td>
<td>Patient insurance coverage information</td>
</tr>
<tr>
<td>item</td>
<td>1..*</td>
<td>✓</td>
<td>Line items (procedures, services)</td>
</tr>
<tr>
<td>item.revenue</td>
<td>0..1</td>
<td>✓</td>
<td>Revenue code (NUBC)</td>
</tr>
<tr>
<td>item.productOrService</td>
<td>1..1</td>
<td>✓</td>
<td>Procedure code (CPT, HCPCS, ICD-10-PCS)</td>
</tr>
<tr>
<td>adjudication</td>
<td>1..*</td>
<td>✓</td>
<td>Payment adjudication details (allowed, paid, etc.)</td>
</tr>
<tr>
<td>total</td>
<td>1..*</td>
<td>✓</td>
<td>Totals: submitted, allowed, paid, patient responsibility</td>
</tr>
</tbody>
</table>

<h3>CARIN BB Coverage Crosswalk</h3>

<table>
<thead>
<tr>
<th>Element</th>
<th>Cardinality</th>
<th>Must Support</th>
<th>Source Mapping Guidance</th>
</tr>
</thead>
<tbody>
<tr>
<td>identifier</td>
<td>0..*</td>
<td>✓</td>
<td>Member ID, subscriber ID</td>
</tr>
<tr>
<td>status</td>
<td>1..1</td>
<td>✓</td>
<td>active | cancelled | draft | entered-in-error</td>
</tr>
<tr>
<td>type</td>
<td>0..1</td>
<td>-</td>
<td>Coverage type (medical, dental, vision, etc.)</td>
</tr>
<tr>
<td>subscriber</td>
<td>0..1</td>
<td>✓</td>
<td>Reference to subscriber (if different from beneficiary)</td>
</tr>
<tr>
<td>subscriberId</td>
<td>0..1</td>
<td>✓</td>
<td>Subscriber identifier</td>
</tr>
<tr>
<td>beneficiary</td>
<td>1..1</td>
<td>✓</td>
<td>Reference to Patient (member)</td>
</tr>
<tr>
<td>relationship</td>
<td>1..1</td>
<td>✓</td>
<td>Beneficiary relationship to subscriber</td>
</tr>
<tr>
<td>period</td>
<td>0..1</td>
<td>✓</td>
<td>Coverage effective dates</td>
</tr>
<tr>
<td>payor</td>
<td>1..*</td>
<td>✓</td>
<td>Reference to payer Organization</td>
</tr>
<tr>
<td>class</td>
<td>0..*</td>
<td>✓</td>
<td>Plan, group, division classifications</td>
</tr>
</tbody>
</table>

<h2>Common Mapping Challenges</h2>

<h3>1. Race and Ethnicity Extensions</h3>

<p>US Core requires specific extension structure for race/ethnicity:</p>

<pre><code class="language-json">{
  "extension": [{
    "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
    "extension": [
      {
        "url": "ombCategory",
        "valueCoding": {
          "system": "urn:oid:2.16.840.1.113883.6.238",
          "code": "2106-3",
          "display": "White"
        }
      },
      {
        "url": "text",
        "valueString": "White"
      }
    ]
  }]
}
</code></pre>

<h3>2. Terminology Binding Strength</h3>

<ul>
<li><strong>Required</strong>: Must use codes from the specified value set</li>
<li><strong>Extensible</strong>: Should use codes from value set, but can use others if no suitable code exists</li>
<li><strong>Preferred</strong>: Recommended but not required</li>
<li><strong>Example</strong>: Just an example, use any appropriate code</li>
</ul>

<h3>3. Missing Data Handling</h3>

<pre><code class="language-python"># Use dataAbsentReason when required element has no value
observation = Observation(
    status="final",
    code={"coding": [...]},
    subject={"reference": "Patient/123"},
    # No value available
    dataAbsentReason={
        "coding": [{
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "unknown",
            "display": "Unknown"
        }]
    }
)
</code></pre>

<h2>Validation Tools</h2>

<h3>Validate Against Profiles</h3>

<pre><code class="language-bash"># Validate against US Core Patient profile
java -jar validator_cli.jar patient.json \\
  -version 4.0.1 \\
  -ig hl7.fhir.us.core#6.1.0

# Validate against CARIN BB EOB profile
java -jar validator_cli.jar eob.json \\
  -version 4.0.1 \\
  -ig hl7.fhir.us.carin-bb#2.0.0
</code></pre>

<h2>Resources</h2>

<ul>
<li><a href="http://hl7.org/fhir/us/core/" target="_blank">US Core Implementation Guide</a></li>
<li><a href="https://build.fhir.org/ig/HL7/carin-bb/" target="_blank">CARIN Blue Button IG</a></li>
<li><a href="https://www.cms.gov/regulations-and-guidance/guidance/interoperability" target="_blank">CMS Interoperability Rules</a></li>
<li><a href="https://confluence.hl7.org/display/DVP/Da+Vinci+Project" target="_blank">Da Vinci Project</a></li>
</ul>
        `
    },

    'data-quality-playbooks': {
        title: 'Data Quality & Validation Playbooks',
        content: `
<h1>Data Quality & Validation Playbooks</h1>

<p>Comprehensive strategies for ensuring data quality in FHIR mapping pipelines using Great Expectations, automated testing, and CI/CD patterns.</p>

<h2>Overview</h2>

<p>Data quality is critical for FHIR interoperability. This playbook provides practical patterns for validating source data, ensuring mapping accuracy, and maintaining quality throughout the pipeline.</p>

<div class="warning-box">
<strong>Critical Point:</strong> Validate early, validate often. Catching data quality issues before FHIR transformation saves time and prevents downstream errors.
</div>

<h2>Data Quality Dimensions</h2>

<table>
<thead>
<tr>
<th>Dimension</th>
<th>Description</th>
<th>Example Checks</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Completeness</strong></td>
<td>All required fields present</td>
<td>Patient has identifier, name, gender, birthDate</td>
</tr>
<tr>
<td><strong>Validity</strong></td>
<td>Data matches expected format/type</td>
<td>Dates in YYYY-MM-DD, phone matches pattern</td>
</tr>
<tr>
<td><strong>Accuracy</strong></td>
<td>Data is correct and up-to-date</td>
<td>Age calculated from birthDate is reasonable</td>
</tr>
<tr>
<td><strong>Consistency</strong></td>
<td>Data agrees across sources</td>
<td>Gender consistent across records</td>
</tr>
<tr>
<td><strong>Uniqueness</strong></td>
<td>No unwanted duplicates</td>
<td>Each patient has unique identifier</td>
</tr>
<tr>
<td><strong>Timeliness</strong></td>
<td>Data is current and available when needed</td>
<td>Lab results within expected timeframe</td>
</tr>
</tbody>
</table>

<h2>Great Expectations for FHIR Data</h2>

<h3>Setup</h3>

<pre><code class="language-bash"># Install Great Expectations
pip install great-expectations pandas polars

# Initialize Great Expectations project
great_expectations init
</code></pre>

<h3>Define Expectations for Source Data</h3>

<pre><code class="language-python">import great_expectations as gx
import pandas as pd
from datetime import datetime, timedelta

# Create Data Context
context = gx.get_context()

# Define expectations for patient source data
def create_patient_expectations(context, df):
    """Create expectations suite for patient source data"""

    # Create validator
    validator = context.sources.pandas_default.read_dataframe(df)
    validator.expectation_suite_name = "patient_source_suite"

    # Completeness checks
    validator.expect_column_values_to_not_be_null(
        column="patient_id",
        meta={"description": "Patient ID is required"}
    )

    validator.expect_column_values_to_not_be_null(
        column="last_name",
        meta={"description": "Last name is required for US Core"}
    )

    # Validity checks
    validator.expect_column_values_to_match_regex(
        column="birth_date",
        regex=r"^\d{4}-\d{2}-\d{2}$",
        meta={"description": "Birth date must be YYYY-MM-DD"}
    )

    validator.expect_column_values_to_be_in_set(
        column="gender",
        value_set=["male", "female", "other", "unknown"],
        meta={"description": "Gender must be valid FHIR value"}
    )

    validator.expect_column_values_to_match_regex(
        column="phone",
        regex=r"^\+?1?\d{10,15}$",
        mostly=0.95,  # Allow 5% missing/invalid
        meta={"description": "Phone should be valid format"}
    )

    validator.expect_column_values_to_match_regex(
        column="email",
        regex=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
        mostly=0.9,
        meta={"description": "Email should be valid format"}
    )

    # Uniqueness check
    validator.expect_column_values_to_be_unique(
        column="patient_id",
        meta={"description": "Patient IDs must be unique"}
    )

    # Range checks
    validator.expect_column_values_to_be_between(
        column="age",
        min_value=0,
        max_value=120,
        meta={"description": "Age must be reasonable"}
    )

    # Custom validation: Birth date not in future
    def birth_date_not_future(df):
        today = datetime.now().date()
        return all(pd.to_datetime(df["birth_date"]).dt.date <= today)

    validator.expect_column_values_to_match_custom_query(
        query=birth_date_not_future,
        meta={"description": "Birth date cannot be in future"}
    )

    return validator

# Run validation
df = pd.read_csv("patient_source_data.csv")
validator = create_patient_expectations(context, df)
results = validator.validate()

# Generate report
context.build_data_docs()

print(f"Validation {'PASSED' if results.success else 'FAILED'}")
print(f"Success rate: {results.statistics['success_percent']:.2f}%")
</code></pre>

<h3>Lab Results Expectations</h3>

<pre><code class="language-python">def create_lab_expectations(context, df):
    """Expectations for lab result source data"""

    validator = context.sources.pandas_default.read_dataframe(df)
    validator.expectation_suite_name = "lab_results_suite"

    # Required fields
    validator.expect_column_values_to_not_be_null(column="patient_id")
    validator.expect_column_values_to_not_be_null(column="test_code")
    validator.expect_column_values_to_not_be_null(column="test_date")

    # Terminology validation - LOINC codes
    validator.expect_column_values_to_match_regex(
        column="loinc_code",
        regex=r"^\d{4,5}-\d$",
        meta={"description": "LOINC codes must match pattern"}
    )

    # Numeric results should be numeric
    validator.expect_column_values_to_be_of_type(
        column="numeric_result",
        type_="float64"
    )

    # Status values
    validator.expect_column_values_to_be_in_set(
        column="status",
        value_set=["final", "preliminary", "corrected", "cancelled"],
        meta={"description": "Valid FHIR observation statuses"}
    )

    # Units should be UCUM compliant (basic check)
    common_ucum_units = ["mg/dL", "mmol/L", "g/dL", "10*3/uL", "%", "mm[Hg]"]
    validator.expect_column_values_to_be_in_set(
        column="unit",
        value_set=common_ucum_units,
        mostly=0.8,  # Allow some variation
        meta={"description": "Units should be UCUM format"}
    )

    # Reference ranges should be logical
    def ref_range_logical(df):
        return all(df["ref_range_low"] < df["ref_range_high"])

    validator.expect_column_values_to_match_custom_query(
        query=ref_range_logical,
        meta={"description": "Low ref range < high ref range"}
    )

    return validator
</code></pre>

<h2>Post-Mapping FHIR Validation</h2>

<h3>Validate FHIR Resources</h3>

<pre><code class="language-python">import subprocess
import json
from pathlib import Path

class FHIRValidator:
    """Validate FHIR resources against profiles"""

    def __init__(self, validator_jar_path, fhir_version="4.0.1"):
        self.validator_jar = validator_jar_path
        self.fhir_version = fhir_version

    def validate_resource(self, resource_path, profile=None):
        """Validate a FHIR resource file"""

        cmd = [
            "java", "-jar", self.validator_jar,
            str(resource_path),
            "-version", self.fhir_version
        ]

        if profile:
            cmd.extend(["-profile", profile])

        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True
        )

        return {
            "success": result.returncode == 0,
            "output": result.stdout,
            "errors": result.stderr
        }

    def validate_bundle(self, bundle_path, profiles=None):
        """Validate all resources in a FHIR Bundle"""

        with open(bundle_path) as f:
            bundle = json.load(f)

        results = []
        for entry in bundle.get("entry", []):
            resource = entry.get("resource", {})
            resource_type = resource.get("resourceType")

            # Write resource to temp file
            temp_file = Path(f"/tmp/{resource_type}_{resource.get('id', 'temp')}.json")
            temp_file.write_text(json.dumps(resource, indent=2))

            # Validate with appropriate profile
            profile = profiles.get(resource_type) if profiles else None
            result = self.validate_resource(temp_file, profile)

            results.append({
                "resource_type": resource_type,
                "resource_id": resource.get("id"),
                "valid": result["success"],
                "errors": self.parse_errors(result["output"])
            })

            temp_file.unlink()

        return results

    def parse_errors(self, output):
        """Parse validation errors from output"""
        errors = []
        for line in output.split("\n"):
            if "Error" in line or "Warning" in line:
                errors.append(line.strip())
        return errors

# Usage
validator = FHIRValidator("/path/to/validator_cli.jar")

# Validate against US Core
us_core_profiles = {
    "Patient": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient",
    "Observation": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-observation-lab"
}

results = validator.validate_bundle("output_bundle.json", us_core_profiles)

for result in results:
    print(f"{result['resource_type']}/{result['resource_id']}: {'✓' if result['valid'] else '✗'}")
    if result['errors']:
        for error in result['errors']:
            print(f"  - {error}")
</code></pre>

<h2>CI/CD Pipeline Patterns</h2>

<h3>GitHub Actions Workflow</h3>

<pre><code class="language-yaml"># .github/workflows/fhir-validation.yml
name: FHIR Data Quality Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  validate-source-data:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          pip install great-expectations pandas polars pydantic fhir.resources

      - name: Run Great Expectations on source data
        run: |
          python scripts/validate_source_data.py

      - name: Upload validation results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: source-validation-results
          path: gx/uncommitted/data_docs/

  transform-and-validate-fhir:
    runs-on: ubuntu-latest
    needs: validate-source-data

    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Set up Java
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Download FHIR Validator
        run: |
          wget https://github.com/hapifhir/org.hl7.fhir.core/releases/latest/download/validator_cli.jar

      - name: Install Python dependencies
        run: |
          pip install -r requirements.txt

      - name: Run FHIR mapping pipeline
        run: |
          python scripts/run_mapping_pipeline.py

      - name: Validate FHIR output
        run: |
          # Validate against US Core
          java -jar validator_cli.jar output/bundle.json \\
            -version 4.0.1 \\
            -ig hl7.fhir.us.core#6.1.0 \\
            | tee validation_results.txt

      - name: Check validation success
        run: |
          if grep -q "Error" validation_results.txt; then
            echo "FHIR validation failed!"
            exit 1
          fi

      - name: Upload FHIR validation results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: fhir-validation-results
          path: validation_results.txt

      - name: Run data quality metrics
        run: |
          python scripts/calculate_quality_metrics.py

      - name: Comment PR with results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const metrics = fs.readFileSync('quality_metrics.json', 'utf8');
            const metricsData = JSON.parse(metrics);

            const comment = \`## FHIR Data Quality Report

            **Source Data Validation**: ${metricsData.source_valid ? '✅ Passed' : '❌ Failed'}
            **FHIR Validation**: ${metricsData.fhir_valid ? '✅ Passed' : '❌ Failed'}
            **Completeness**: ${metricsData.completeness}%
            **Accuracy**: ${metricsData.accuracy}%

            See artifacts for detailed reports.
            \`;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
</code></pre>

<h3>Pre-commit Hooks</h3>

<pre><code class="language-yaml"># .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: validate-mapping-configs
        name: Validate YAML mapping configs
        entry: python scripts/validate_mappings.py
        language: python
        files: \\.yaml$

      - id: check-terminology
        name: Check terminology codes
        entry: python scripts/check_terminology.py
        language: python
        files: mappings/.*\\.yaml$

      - id: format-fhir-json
        name: Format FHIR JSON
        entry: python -m json.tool
        language: system
        files: \\.json$
</code></pre>

<h2>Data Quality Metrics Dashboard</h2>

<pre><code class="language-python">import polars as pl
from datetime import datetime
import json

class DataQualityMetrics:
    """Calculate and track data quality metrics"""

    def __init__(self):
        self.metrics = {}

    def calculate_completeness(self, df, required_fields):
        """Calculate completeness for required fields"""
        completeness = {}

        for field in required_fields:
            if field in df.columns:
                non_null = df[field].is_not_null().sum()
                total = len(df)
                completeness[field] = (non_null / total * 100) if total > 0 else 0

        return completeness

    def calculate_validity(self, df, validation_rules):
        """Calculate validity based on validation rules"""
        validity = {}

        for field, rule in validation_rules.items():
            if field not in df.columns:
                continue

            if rule["type"] == "regex":
                valid = df[field].str.contains(rule["pattern"]).sum()
            elif rule["type"] == "range":
                valid = df.filter(
                    (pl.col(field) >= rule["min"]) &
                    (pl.col(field) <= rule["max"])
                ).height
            elif rule["type"] == "set":
                valid = df.filter(pl.col(field).is_in(rule["values"])).height

            validity[field] = (valid / len(df) * 100) if len(df) > 0 else 0

        return validity

    def calculate_consistency(self, df1, df2, key_field):
        """Calculate consistency between two datasets"""
        # Join on key field and compare
        joined = df1.join(df2, on=key_field, suffix="_right")

        consistency = {}
        for col in df1.columns:
            if col == key_field or col not in df2.columns:
                continue

            col_right = f"{col}_right"
            if col_right in joined.columns:
                consistent = (joined[col] == joined[col_right]).sum()
                consistency[col] = (consistent / len(joined) * 100) if len(joined) > 0 else 0

        return consistency

    def generate_report(self, output_file="quality_metrics.json"):
        """Generate comprehensive quality report"""
        report = {
            "timestamp": datetime.now().isoformat(),
            "metrics": self.metrics,
            "summary": {
                "overall_score": self.calculate_overall_score(),
                "issues": self.identify_issues()
            }
        }

        with open(output_file, "w") as f:
            json.dump(report, f, indent=2)

        return report

    def calculate_overall_score(self):
        """Calculate weighted overall quality score"""
        scores = []

        if "completeness" in self.metrics:
            avg_completeness = sum(self.metrics["completeness"].values()) / len(self.metrics["completeness"])
            scores.append(avg_completeness * 0.3)  # 30% weight

        if "validity" in self.metrics:
            avg_validity = sum(self.metrics["validity"].values()) / len(self.metrics["validity"])
            scores.append(avg_validity * 0.4)  # 40% weight

        if "consistency" in self.metrics:
            avg_consistency = sum(self.metrics["consistency"].values()) / len(self.metrics["consistency"])
            scores.append(avg_consistency * 0.3)  # 30% weight

        return sum(scores) if scores else 0

    def identify_issues(self):
        """Identify fields with quality issues"""
        issues = []

        for metric_type, values in self.metrics.items():
            for field, score in values.items():
                if score < 90:  # Threshold: 90%
                    issues.append({
                        "field": field,
                        "metric": metric_type,
                        "score": score,
                        "severity": "critical" if score < 70 else "warning"
                    })

        return sorted(issues, key=lambda x: x["score"])

# Usage
metrics = DataQualityMetrics()

# Calculate metrics
df = pl.read_csv("patient_data.csv")

metrics.metrics["completeness"] = metrics.calculate_completeness(
    df,
    required_fields=["patient_id", "last_name", "birth_date", "gender"]
)

metrics.metrics["validity"] = metrics.calculate_validity(
    df,
    validation_rules={
        "birth_date": {"type": "regex", "pattern": r"^\d{4}-\d{2}-\d{2}$"},
        "gender": {"type": "set", "values": ["male", "female", "other", "unknown"]},
        "age": {"type": "range", "min": 0, "max": 120}
    }
)

report = metrics.generate_report()
print(f"Overall Quality Score: {report['summary']['overall_score']:.2f}%")
</code></pre>

<h2>Best Practices</h2>

<div class="success-box">
<h3>Validation Strategy</h3>
<ol>
<li><strong>Validate Early</strong>: Check source data before transformation</li>
<li><strong>Validate Often</strong>: Run checks at each pipeline stage</li>
<li><strong>Automate Everything</strong>: Use CI/CD for continuous validation</li>
<li><strong>Track Metrics</strong>: Monitor quality trends over time</li>
<li><strong>Document Expectations</strong>: Make validation rules explicit and versioned</li>
</ol>
</div>

<h2>Common Validation Failures</h2>

<table>
<thead>
<tr>
<th>Issue</th>
<th>Impact</th>
<th>Prevention</th>
</tr>
</thead>
<tbody>
<tr>
<td>Missing required identifiers</td>
<td>High - Resource won't validate</td>
<td>Add NOT NULL constraints, Great Expectations checks</td>
</tr>
<tr>
<td>Invalid date formats</td>
<td>High - Parsing failures</td>
<td>Regex validation, automated date parsing tests</td>
</tr>
<tr>
<td>Wrong terminology codes</td>
<td>Medium - Semantic errors</td>
<td>Terminology service validation, value set checks</td>
</tr>
<tr>
<td>Incorrect cardinality</td>
<td>High - Profile violations</td>
<td>Profile validation in CI/CD</td>
</tr>
<tr>
<td>Missing Must Support elements</td>
<td>Medium - US Core violations</td>
<td>Profile-specific validation rules</td>
</tr>
</tbody>
</table>

<h2>Resources</h2>

<ul>
<li><a href="https://greatexpectations.io/" target="_blank">Great Expectations Documentation</a></li>
<li><a href="https://github.com/hapifhir/org.hl7.fhir.core" target="_blank">FHIR Validator</a></li>
<li><a href="https://www.hl7.org/fhir/validation.html" target="_blank">FHIR Validation Guide</a></li>
<li><a href="https://github.com/features/actions" target="_blank">GitHub Actions</a></li>
</ul>
        `
    },

    'mapping-governance': {
        title: 'Mapping Governance & Security',
        content: `
<h1>Mapping Governance & Security</h1>

<p>Comprehensive guidance on governance, security, and secure MCP (Model Context Protocol) workflows for FHIR mapping projects.</p>

<h2>Overview</h2>

<p>Effective governance ensures mapping quality, security, compliance, and maintainability across the organization.</p>

<div class="warning-box">
<strong>Security First:</strong> FHIR mapping often involves PHI/PII. Implement security controls from day one, not as an afterthought.
</div>

<h2>Mapping Governance Framework</h2>

<h3>1. Governance Structure</h3>

<table>
<thead>
<tr>
<th>Role</th>
<th>Responsibilities</th>
<th>Skills Required</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Mapping Owner</strong></td>
<td>Define business requirements, approve mappings</td>
<td>Domain expertise, FHIR knowledge</td>
</tr>
<tr>
<td><strong>Technical Lead</strong></td>
<td>Architecture, technical standards, reviews</td>
<td>FHIR expert, software architecture</td>
</tr>
<tr>
<td><strong>Data Steward</strong></td>
<td>Data quality, terminology management</td>
<td>Data governance, healthcare standards</td>
</tr>
<tr>
<td><strong>Security Officer</strong></td>
<td>Security controls, compliance, audits</td>
<td>Security, HIPAA/GDPR, risk management</td>
</tr>
<tr>
<td><strong>Developer</strong></td>
<td>Implement mappings, unit tests</td>
<td>Python/Java, FHIR APIs, testing</td>
</tr>
<tr>
<td><strong>QA Analyst</strong></td>
<td>Validation, testing, quality assurance</td>
<td>Testing methodologies, FHIR validation</td>
</tr>
</tbody>
</table>

<h3>2. Mapping Lifecycle</h3>

<pre><code class="language-text">1. Requirements → 2. Design → 3. Development → 4. Review → 5. Testing → 6. Approval → 7. Deployment → 8. Monitoring
</code></pre>

<h3>3. Documentation Standards</h3>

<pre><code class="language-yaml"># mapping-metadata.yaml
mapping_id: PAT-001
version: 2.1.0
status: active  # draft | review | active | deprecated
effective_date: 2024-01-15
expiration_date: null

owner:
  name: Jane Smith
  email: jane.smith@example.com
  department: Health Informatics

technical_lead:
  name: John Doe
  email: john.doe@example.com

source:
  system: Epic EHR
  version: 2023.1
  format: HL7 v2.5.1 ADT

target:
  profile: US Core Patient v6.1.0
  profile_url: http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient

dependencies:
  - mapping_id: TERM-001
    description: Race code mapping
  - mapping_id: TERM-002
    description: Ethnicity code mapping

change_history:
  - version: 2.1.0
    date: 2024-01-15
    author: John Doe
    changes: Added support for multiple phone numbers
  - version: 2.0.0
    date: 2023-11-01
    author: Jane Smith
    changes: Updated to US Core 6.1.0

quality_metrics:
  completeness_threshold: 95%
  validation_pass_rate: 98%
  performance_sla: 100ms per record

security_classification: PHI
encryption_required: true
audit_logging: required
</code></pre>

<h2>Version Control Best Practices</h2>

<h3>Repository Structure</h3>

<pre><code class="language-text">fhir-mapping-project/
├── mappings/
│   ├── patient/
│   │   ├── epic_to_uscore_patient.yaml
│   │   ├── cerner_to_uscore_patient.yaml
│   │   └── metadata.yaml
│   ├── observation/
│   │   └── lab_to_uscore_observation.yaml
│   └── terminology/
│       ├── race_codes.yaml
│       └── ethnicity_codes.yaml
├── schemas/
│   ├── source_schemas/
│   │   ├── epic_adt.json
│   │   └── cerner_patient.json
│   └── target_profiles/
│       └── us_core_6.1.0/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── docs/
│   ├── mapping_specifications/
│   ├── change_logs/
│   └── runbooks/
├── scripts/
│   ├── validate_mappings.py
│   ├── deploy_mappings.py
│   └── generate_docs.py
└── .github/
    └── workflows/
        ├── validate.yml
        ├── test.yml
        └── deploy.yml
</code></pre>

<h3>Git Workflow</h3>

<pre><code class="language-bash"># Feature branch workflow
git checkout -b feature/add-uscore-condition-mapping

# Make changes
git add mappings/condition/epic_to_uscore_condition.yaml
git commit -m "Add US Core Condition mapping for Epic

- Map Epic problem list to US Core Condition
- Include clinical status and verification status
- Add SNOMED CT code mapping
- Tests: 100% pass rate

Reviewed-by: @jane-smith
Ticket: FHIR-123"

# Create pull request
gh pr create --title "Add US Core Condition mapping" \\
  --body "## Changes
  - New mapping for Epic problems to US Core Condition
  - Added terminology mapping for condition codes

  ## Testing
  - Unit tests: ✓
  - Integration tests: ✓
  - Validation: ✓

  ## Checklist
  - [x] Documentation updated
  - [x] Tests passing
  - [x] Security review completed
  - [x] Data steward approval"

# After approval
git checkout main
git merge feature/add-uscore-condition-mapping
git tag -a v2.1.0 -m "Release 2.1.0: Added Condition mapping"
git push origin main --tags
</code></pre>

<h3>Code Review Checklist</h3>

<pre><code class="language-markdown">## Mapping Review Checklist

### Correctness
- [ ] All source fields mapped correctly
- [ ] Required FHIR elements populated
- [ ] Must Support elements handled
- [ ] Cardinality requirements met
- [ ] Data types correct

### Quality
- [ ] Terminology codes validated
- [ ] Default values appropriate
- [ ] Error handling defined
- [ ] Edge cases considered
- [ ] Performance acceptable

### Compliance
- [ ] Profile conformance verified
- [ ] US Core requirements met
- [ ] Security controls applied
- [ ] PHI handling appropriate
- [ ] Audit logging configured

### Documentation
- [ ] Mapping documented
- [ ] Examples provided
- [ ] Change log updated
- [ ] Test cases documented

### Testing
- [ ] Unit tests pass (100%)
- [ ] Integration tests pass
- [ ] Validation tests pass
- [ ] Performance tests pass

### Security
- [ ] No hardcoded credentials
- [ ] Sensitive data encrypted
- [ ] Access controls defined
- [ ] Audit trail configured
</code></pre>

<h2>Security Controls</h2>

<h3>Data Classification</h3>

<table>
<thead>
<tr>
<th>Classification</th>
<th>Examples</th>
<th>Controls Required</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Public</strong></td>
<td>FHIR profiles, schemas</td>
<td>Standard version control</td>
</tr>
<tr>
<td><strong>Internal</strong></td>
<td>Mapping configurations, test data (de-identified)</td>
<td>Access control, code review</td>
</tr>
<tr>
<td><strong>Confidential</strong></td>
<td>Connection strings, API keys</td>
<td>Secrets management, encryption</td>
</tr>
<tr>
<td><strong>PHI/PII</strong></td>
<td>Patient data, identifiers</td>
<td>Encryption at rest/transit, audit logging, access controls</td>
</tr>
</tbody>
</table>

<h3>Secrets Management</h3>

<pre><code class="language-python"># Use environment variables and secrets management
import os
from azure.keyvault.secrets import SecretClient
from azure.identity import DefaultAzureCredential

class SecureConfig:
    """Secure configuration management"""

    def __init__(self):
        self.key_vault_name = os.environ["KEY_VAULT_NAME"]
        self.credential = DefaultAzureCredential()
        self.client = SecretClient(
            vault_url=f"https://{self.key_vault_name}.vault.azure.net",
            credential=self.credential
        )

    def get_fhir_server_url(self):
        """Get FHIR server URL from Key Vault"""
        return self.client.get_secret("fhir-server-url").value

    def get_fhir_api_key(self):
        """Get FHIR API key from Key Vault"""
        return self.client.get_secret("fhir-api-key").value

    def get_database_connection_string(self):
        """Get encrypted database connection string"""
        return self.client.get_secret("database-connection-string").value

# Never hardcode secrets!
# ❌ BAD
# fhir_url = "https://fhir.example.com"
# api_key = "abc123secret"

# ✓ GOOD
config = SecureConfig()
fhir_url = config.get_fhir_server_url()
api_key = config.get_fhir_api_key()
</code></pre>

<h3>Encryption</h3>

<pre><code class="language-python">from cryptography.fernet import Fernet
import base64
import os

class DataEncryption:
    """Encrypt sensitive data in mapping pipeline"""

    def __init__(self):
        # Get encryption key from environment or Key Vault
        key = os.environ.get("ENCRYPTION_KEY")
        if not key:
            raise ValueError("ENCRYPTION_KEY not set")
        self.cipher = Fernet(key.encode())

    def encrypt_identifier(self, identifier: str) -> str:
        """Encrypt patient identifier"""
        encrypted = self.cipher.encrypt(identifier.encode())
        return base64.urlsafe_b64encode(encrypted).decode()

    def decrypt_identifier(self, encrypted: str) -> str:
        """Decrypt patient identifier"""
        encrypted_bytes = base64.urlsafe_b64decode(encrypted.encode())
        decrypted = self.cipher.decrypt(encrypted_bytes)
        return decrypted.decode()

    def hash_identifier(self, identifier: str) -> str:
        """One-way hash for de-identification"""
        import hashlib
        return hashlib.sha256(identifier.encode()).hexdigest()

# Usage in mapping pipeline
encryptor = DataEncryption()

# Encrypt PHI before storage
encrypted_mrn = encryptor.encrypt_identifier(patient_mrn)

# Hash for de-identified datasets
hashed_id = encryptor.hash_identifier(patient_mrn)
</code></pre>

<h3>Audit Logging</h3>

<pre><code class="language-python">import logging
import json
from datetime import datetime

class AuditLogger:
    """HIPAA-compliant audit logging"""

    def __init__(self, log_file="audit.log"):
        self.logger = logging.getLogger("fhir_mapping_audit")
        handler = logging.FileHandler(log_file)
        handler.setFormatter(logging.Formatter('%(message)s'))
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)

    def log_access(self, user, resource_type, resource_id, action):
        """Log access to PHI"""
        audit_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "event_type": "access",
            "user": user,
            "resource_type": resource_type,
            "resource_id": resource_id,
            "action": action,
            "ip_address": self.get_client_ip(),
            "session_id": self.get_session_id()
        }
        self.logger.info(json.dumps(audit_entry))

    def log_transformation(self, source_id, target_id, mapping_version):
        """Log data transformation"""
        audit_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "event_type": "transformation",
            "source_id": source_id,
            "target_id": target_id,
            "mapping_version": mapping_version
        }
        self.logger.info(json.dumps(audit_entry))

    def log_validation_failure(self, resource_id, errors):
        """Log validation failures"""
        audit_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "event_type": "validation_failure",
            "resource_id": resource_id,
            "errors": errors
        }
        self.logger.info(json.dumps(audit_entry))

# Usage
audit = AuditLogger()
audit.log_access("john.doe@example.com", "Patient", "12345", "read")
audit.log_transformation("epic_123", "fhir_patient_123", "v2.1.0")
</code></pre>

<h2>Secure MCP Workflows</h2>

<h3>Model Context Protocol (MCP) Security</h3>

<p>When using LLMs or MCP servers for FHIR mapping assistance:</p>

<div class="warning-box">
<strong>Never send PHI to external LLM services!</strong> Use only de-identified or synthetic data for LLM-assisted mapping.
</div>

<h3>Secure MCP Configuration</h3>

<pre><code class="language-json">{
  "mcpServers": {
    "fhir-mapping-assistant": {
      "command": "python",
      "args": ["-m", "mcp_server.fhir_mapping"],
      "env": {
        "FHIR_SERVER_URL": "${FHIR_SERVER_URL}",
        "API_KEY": "${API_KEY}",
        "DATA_CLASSIFICATION": "internal",
        "PHI_ALLOWED": "false"
      },
      "security": {
        "sandbox": true,
        "network_isolation": true,
        "allowed_hosts": ["fhir.example.com"],
        "max_memory": "512MB",
        "timeout": 30
      }
    }
  }
}
</code></pre>

<h3>Data Sanitization for MCP</h3>

<pre><code class="language-python">class DataSanitizer:
    """Sanitize data before sending to MCP/LLM"""

    PHI_PATTERNS = [
        r'\b\d{3}-\d{2}-\d{4}\b',  # SSN
        r'\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b',  # Email
        r'\b\d{10}\b',  # Phone
        r'\b\d{5}(-\d{4})?\b',  # ZIP
    ]

    def sanitize_for_llm(self, data):
        """Remove PHI before sending to LLM"""
        sanitized = data.copy()

        # Replace names with placeholders
        if "name" in sanitized:
            sanitized["name"] = [{"family": "DOE", "given": ["JOHN"]}]

        # Remove identifiers
        if "identifier" in sanitized:
            sanitized["identifier"] = [{
                "system": "urn:oid:example",
                "value": "REDACTED"
            }]

        # Mask dates (keep format)
        if "birthDate" in sanitized:
            sanitized["birthDate"] = "1970-01-01"

        # Remove addresses
        if "address" in sanitized:
            sanitized["address"] = [{
                "city": "ANYTOWN",
                "state": "CA",
                "postalCode": "00000"
            }]

        return sanitized

    def validate_no_phi(self, text):
        """Verify no PHI in text"""
        import re
        for pattern in self.PHI_PATTERNS:
            if re.search(pattern, text, re.IGNORECASE):
                raise ValueError(f"Potential PHI detected: {pattern}")
        return True

# Usage
sanitizer = DataSanitizer()

# Before sending to MCP/LLM
original_patient = get_patient_from_source()
sanitized_patient = sanitizer.sanitize_for_llm(original_patient)

# Safe to send to LLM for mapping assistance
llm_response = mcp_client.get_mapping_suggestion(sanitized_patient)
</code></pre>

<h2>Compliance Requirements</h2>

<h3>HIPAA Compliance Checklist</h3>

<ul>
<li>☐ Encryption at rest (AES-256)</li>
<li>☐ Encryption in transit (TLS 1.2+)</li>
<li>☐ Access controls (RBAC)</li>
<li>☐ Audit logging (all access to PHI)</li>
<li>☐ Data minimization (only necessary data)</li>
<li>☐ Business Associate Agreements (BAAs)</li>
<li>☐ Breach notification procedures</li>
<li>☐ Data retention policies</li>
<li>☐ Secure data disposal</li>
<li>☐ Employee training</li>
</ul>

<h3>GDPR Considerations</h3>

<ul>
<li>☐ Data subject rights (access, deletion, portability)</li>
<li>☐ Consent management</li>
<li>☐ Data processing agreements</li>
<li>☐ Privacy by design</li>
<li>☐ Data protection impact assessment (DPIA)</li>
</ul>

<h2>Change Management</h2>

<h3>Mapping Change Process</h3>

<pre><code class="language-text">1. Submit Change Request (CR)
   ↓
2. Impact Analysis
   ↓
3. Security Review
   ↓
4. Technical Review
   ↓
5. Testing in Dev/QA
   ↓
6. Stakeholder Approval
   ↓
7. Schedule Deployment
   ↓
8. Deploy to Production
   ↓
9. Monitor & Validate
   ↓
10. Close CR
</code></pre>

<h2>Resources</h2>

<ul>
<li><a href="https://www.hhs.gov/hipaa/for-professionals/security/index.html" target="_blank">HIPAA Security Rule</a></li>
<li><a href="https://gdpr.eu/" target="_blank">GDPR Official Text</a></li>
<li><a href="https://www.nist.gov/cyberframework" target="_blank">NIST Cybersecurity Framework</a></li>
<li><a href="https://owasp.org/www-project-top-ten/" target="_blank">OWASP Top 10</a></li>
</ul>
        `
    },

    'llms-fhir-guardrails': {
        title: 'LLMs + FHIR: Guardrails & Best Practices',
        content: `
<h1>LLMs + FHIR: Guardrails & Best Practices</h1>

<p>Practical, security-first guidance for using Large Language Models (LLMs) in FHIR mapping workflows—focusing on guardrails, not hype.</p>

<div class="warning-box">
<strong>Critical Warning:</strong> LLMs are powerful tools but carry significant risks when handling healthcare data. This guide focuses on safe, compliant, and effective use.
</div>

<h2>Core Principles</h2>

<ol>
<li><strong>Never send PHI to external LLM services</strong></li>
<li><strong>Validate all LLM-generated mappings</strong></li>
<li><strong>Use LLMs as assistants, not authorities</strong></li>
<li><strong>Implement layered validation</strong></li>
<li><strong>Maintain human oversight</strong></li>
</ol>

<h2>Appropriate Use Cases</h2>

<h3>✅ Safe LLM Applications</h3>

<table>
<thead>
<tr>
<th>Use Case</th>
<th>Risk Level</th>
<th>Guardrails</th>
</tr>
</thead>
<tbody>
<tr>
<td>Generating mapping specs from de-identified samples</td>
<td>Low</td>
<td>Manual review, validation</td>
</tr>
<tr>
<td>FHIR profile documentation assistance</td>
<td>Low</td>
<td>Fact-checking against specs</td>
</tr>
<tr>
<td>Code generation for mapping logic</td>
<td>Medium</td>
<td>Code review, unit tests, validation</td>
</tr>
<tr>
<td>Terminology mapping suggestions</td>
<td>Medium</td>
<td>Verify against official code systems</td>
</tr>
<tr>
<td>Test data generation (synthetic)</td>
<td>Low</td>
<td>Format validation only</td>
</tr>
<tr>
<td>Documentation and training materials</td>
<td>Low</td>
<td>Expert review</td>
</tr>
</tbody>
</table>

<h3>❌ Inappropriate LLM Applications</h3>

<ul>
<li>Processing real patient data without de-identification</li>
<li>Automated mapping without validation</li>
<li>Clinical decision-making</li>
<li>Production deployments without human review</li>
<li>Direct patient care applications</li>
<li>Compliance determination</li>
</ul>

<h2>PHI Protection Strategies</h2>

<h3>1. Data De-identification Pipeline</h3>

<pre><code class="language-python">from typing import Dict, Any
import re
import hashlib

class FHIRDeidentifier:
    """De-identify FHIR resources for safe LLM processing"""

    PLACEHOLDER_MAP = {}  # Track original → placeholder mapping

    def deidentify_patient(self, patient: Dict[str, Any]) -> Dict[str, Any]:
        """Remove all PHI from Patient resource"""
        deidentified = {
            "resourceType": "Patient",
            "id": self._create_placeholder_id(patient.get("id", "unknown"))
        }

        # Replace name with placeholder
        if "name" in patient:
            deidentified["name"] = [{
                "family": "PLACEHOLDER_FAMILY",
                "given": ["PLACEHOLDER_GIVEN"]
            }]

        # Keep structure but remove identifying info
        if "birthDate" in patient:
            # Keep year for age calculation, remove month/day
            year = patient["birthDate"][:4]
            deidentified["birthDate"] = f"{year}-01-01"

        # Keep gender (low risk)
        if "gender" in patient:
            deidentified["gender"] = patient["gender"]

        # Remove telecom
        if "telecom" in patient:
            deidentified["telecom"] = [{
                "system": "phone",
                "value": "555-0000"
            }]

        # Replace address with generic
        if "address" in patient:
            deidentified["address"] = [{
                "city": "Example City",
                "state": "XX",
                "postalCode": "00000",
                "country": "US"
            }]

        # Remove all identifiers or replace with placeholders
        if "identifier" in patient:
            deidentified["identifier"] = [{
                "system": "urn:example:placeholder",
                "value": self._create_placeholder_id(
                    str(patient["identifier"][0].get("value", ""))
                )
            }]

        # Keep extensions structure but remove data
        if "extension" in patient:
            deidentified["extension"] = self._sanitize_extensions(
                patient["extension"]
            )

        return deidentified

    def _create_placeholder_id(self, original_id: str) -> str:
        """Create consistent placeholder ID"""
        # Use hash for consistent but de-identified ID
        hash_value = hashlib.sha256(original_id.encode()).hexdigest()[:8]
        placeholder = f"PLACEHOLDER_{hash_value}"
        self.PLACEHOLDER_MAP[placeholder] = original_id  # Track for re-identification
        return placeholder

    def _sanitize_extensions(self, extensions: list) -> list:
        """Keep extension structure, remove values"""
        sanitized = []
        for ext in extensions:
            sanitized_ext = {
                "url": ext.get("url")
            }
            # For complex extensions, keep structure only
            if "extension" in ext:
                sanitized_ext["extension"] = self._sanitize_extensions(ext["extension"])
            # Replace values with placeholders
            if "valueString" in ext:
                sanitized_ext["valueString"] = "PLACEHOLDER"
            if "valueCode" in ext:
                sanitized_ext["valueCode"] = ext["valueCode"]  # Codes are generally safe
            if "valueCoding" in ext:
                sanitized_ext["valueCoding"] = ext["valueCoding"]  # Keep for mapping

            sanitized.append(sanitized_ext)

        return sanitized

    def validate_no_phi(self, resource: Dict[str, Any]) -> bool:
        """Verify resource contains no PHI"""
        resource_str = str(resource)

        # Check for common PHI patterns
        phi_patterns = [
            (r'\b[A-Z][a-z]+ [A-Z][a-z]+\b', 'Possible name'),
            (r'\b\d{3}-\d{2}-\d{4}\b', 'SSN'),
            (r'\b[\w\.-]+@[\w\.-]+\.\w+\b', 'Email'),
            (r'\b\d{10}\b', 'Phone number'),
            (r'\b\d{5}(-\d{4})?\b', 'ZIP code'),
        ]

        for pattern, description in phi_patterns:
            if re.search(pattern, resource_str):
                raise ValueError(f"Potential PHI detected: {description}")

        return True

# Usage
deidentifier = FHIRDeidentifier()

# Original patient with PHI
original = {
    "resourceType": "Patient",
    "id": "12345",
    "name": [{"family": "Smith", "given": ["John", "Robert"]}],
    "birthDate": "1980-05-15",
    "identifier": [{"system": "urn:oid:example", "value": "MRN-98765"}]
}

# Safe for LLM
deidentified = deidentifier.deidentify_patient(original)
deidentifier.validate_no_phi(deidentified)

# Now safe to send to LLM
llm_prompt = f"""
Given this de-identified FHIR Patient resource structure:
{json.dumps(deidentified, indent=2)}

Generate a mapping specification from this source format to US Core Patient profile.
"""
</code></pre>

<h3>2. Synthetic Data Generation</h3>

<pre><code class="language-python">from fhir.resources.patient import Patient
from faker import Faker
import random

class SyntheticFHIRGenerator:
    """Generate realistic but synthetic FHIR data for LLM training/testing"""

    def __init__(self):
        self.fake = Faker()

    def generate_synthetic_patient(self) -> Patient:
        """Generate completely synthetic patient"""

        gender = random.choice(["male", "female", "other"])

        patient = Patient(
            id=self.fake.uuid4(),
            identifier=[{
                "system": "urn:oid:synthetic.example",
                "value": f"SYN-{self.fake.random_number(digits=8)}"
            }],
            name=[{
                "use": "official",
                "family": self.fake.last_name(),
                "given": [self.fake.first_name()]
            }],
            gender=gender,
            birthDate=self.fake.date_of_birth(minimum_age=0, maximum_age=100).isoformat(),
            telecom=[
                {
                    "system": "phone",
                    "value": self.fake.phone_number(),
                    "use": "home"
                },
                {
                    "system": "email",
                    "value": self.fake.email(),
                    "use": "home"
                }
            ],
            address=[{
                "use": "home",
                "line": [self.fake.street_address()],
                "city": self.fake.city(),
                "state": self.fake.state_abbr(),
                "postalCode": self.fake.zipcode(),
                "country": "US"
            }]
        )

        return patient

    def generate_dataset(self, size: int = 100):
        """Generate synthetic dataset for testing"""
        return [self.generate_synthetic_patient() for _ in range(size)]

# Use synthetic data for LLM examples
generator = SyntheticFHIRGenerator()
synthetic_patients = generator.generate_dataset(10)

# Safe to use with LLM
llm_training_data = [p.dict() for p in synthetic_patients]
</code></pre>

<h2>LLM-Assisted Mapping with Validation</h2>

<h3>Layered Validation Approach</h3>

<pre><code class="language-python">from typing import Dict, List
import json

class LLMAssistedMapper:
    """Use LLM for mapping assistance with strong validation"""

    def __init__(self, llm_client, validator):
        self.llm = llm_client
        self.validator = validator  # FHIR validator
        self.approved_mappings = {}  # Cache validated mappings

    def generate_mapping_with_validation(
        self,
        source_sample: Dict,
        target_profile: str
    ) -> Dict:
        """Generate mapping with multi-layer validation"""

        # Layer 1: De-identify source sample
        deidentified = self.deidentify(source_sample)

        # Layer 2: Get LLM suggestion
        llm_mapping = self.get_llm_mapping_suggestion(
            deidentified,
            target_profile
        )

        # Layer 3: Validate syntax
        if not self.validate_mapping_syntax(llm_mapping):
            raise ValueError("LLM generated invalid mapping syntax")

        # Layer 4: Test with synthetic data
        test_result = self.test_mapping_with_synthetic_data(llm_mapping)
        if not test_result["success"]:
            raise ValueError(f"Mapping test failed: {test_result['errors']}")

        # Layer 5: FHIR profile validation
        sample_output = self.apply_mapping(deidentified, llm_mapping)
        validation_result = self.validator.validate_resource(
            sample_output,
            target_profile
        )
        if not validation_result["success"]:
            raise ValueError(f"FHIR validation failed: {validation_result['errors']}")

        # Layer 6: Human review flag
        llm_mapping["requires_human_review"] = True
        llm_mapping["llm_generated"] = True
        llm_mapping["validation_timestamp"] = datetime.now().isoformat()

        return llm_mapping

    def get_llm_mapping_suggestion(
        self,
        source: Dict,
        target_profile: str
    ) -> Dict:
        """Get mapping suggestion from LLM with constrained prompt"""

        prompt = f"""You are a FHIR mapping expert. Generate a field-level mapping specification.

SOURCE STRUCTURE (de-identified):
{json.dumps(source, indent=2)}

TARGET PROFILE: {target_profile}

Generate a mapping in this exact JSON format:
{{
  "source_field": "target_fhir_path",
  "source_field2": "target_fhir_path2"
}}

Requirements:
1. Only use valid FHIR paths
2. Include required elements only
3. No hardcoded values
4. No assumptions about data

Respond with JSON only, no explanation."""

        response = self.llm.generate(
            prompt,
            max_tokens=2000,
            temperature=0.1,  # Low temperature for consistency
            stop=["```"]
        )

        try:
            mapping = json.loads(response)
            return mapping
        except json.JSONDecodeError:
            raise ValueError("LLM did not return valid JSON")

    def validate_mapping_syntax(self, mapping: Dict) -> bool:
        """Validate mapping has correct structure"""
        if not isinstance(mapping, dict):
            return False

        # Check all values are strings (FHIR paths)
        for key, value in mapping.items():
            if not isinstance(key, str) or not isinstance(value, str):
                return False

            # Basic FHIR path validation
            if not self.is_valid_fhir_path(value):
                return False

        return True

    def is_valid_fhir_path(self, path: str) -> bool:
        """Basic FHIR path syntax validation"""
        # Simple check: should contain resource element
        valid_patterns = [
            r'^[A-Z][a-zA-Z]+\.[a-z][a-zA-Z0-9]*',  # Patient.name
            r'^[a-z][a-zA-Z0-9]*$',  # name
        ]

        import re
        return any(re.match(pattern, path) for pattern in valid_patterns)

    def test_mapping_with_synthetic_data(self, mapping: Dict) -> Dict:
        """Test mapping with synthetic data"""
        generator = SyntheticFHIRGenerator()
        synthetic_samples = generator.generate_dataset(10)

        errors = []
        for sample in synthetic_samples:
            try:
                result = self.apply_mapping(sample.dict(), mapping)
                # Validate result structure
                if not result:
                    errors.append("Empty result")
            except Exception as e:
                errors.append(str(e))

        return {
            "success": len(errors) == 0,
            "errors": errors,
            "samples_tested": len(synthetic_samples)
        }

# Usage
mapper = LLMAssistedMapper(llm_client, fhir_validator)

source_sample = deidentifier.deidentify_patient(real_patient)
mapping = mapper.generate_mapping_with_validation(
    source_sample,
    "http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient"
)

print(f"Mapping generated and validated")
print(f"Requires human review: {mapping['requires_human_review']}")
</code></pre>

<h2>Guardrails Checklist</h2>

<h3>Before Using LLM</h3>

<ul>
<li>☐ Data is de-identified or synthetic</li>
<li>☐ No PHI/PII in prompts</li>
<li>☐ Clear use case documented</li>
<li>☐ Validation strategy defined</li>
<li>☐ Human review process established</li>
<li>☐ Audit logging configured</li>
</ul>

<h3>During LLM Use</h3>

<ul>
<li>☐ Monitor for PHI leakage</li>
<li>☐ Validate all outputs</li>
<li>☐ Track token usage and costs</li>
<li>☐ Log all interactions</li>
<li>☐ Rate limit requests</li>
</ul>

<h3>After LLM Use</h3>

<ul>
<li>☐ Human expert review</li>
<li>☐ Profile validation passed</li>
<li>☐ Unit tests created</li>
<li>☐ Integration tests passed</li>
<li>☐ Documentation updated</li>
<li>☐ Audit trail complete</li>
</ul>

<h2>Common Pitfalls and Solutions</h2>

<table>
<thead>
<tr>
<th>Pitfall</th>
<th>Risk</th>
<th>Solution</th>
</tr>
</thead>
<tbody>
<tr>
<td>Trusting LLM output without validation</td>
<td>High - Incorrect mappings</td>
<td>Always validate with FHIR validator and tests</td>
</tr>
<tr>
<td>Sending real patient data to LLM</td>
<td>Critical - HIPAA violation</td>
<td>De-identify or use synthetic data only</td>
</tr>
<tr>
<td>Using LLM for production without review</td>
<td>High - Quality issues</td>
<td>Require human expert review</td>
</tr>
<tr>
<td>Hallucinated FHIR elements</td>
<td>Medium - Invalid resources</td>
<td>Validate against official FHIR specs</td>
</tr>
<tr>
<td>Inconsistent mappings</td>
<td>Medium - Data quality</td>
<td>Use low temperature, cache validated mappings</td>
</tr>
<tr>
<td>No audit trail</td>
<td>High - Compliance issues</td>
<td>Log all LLM interactions and validations</td>
</tr>
</tbody>
</table>

<h2>Metrics and Monitoring</h2>

<pre><code class="language-python">class LLMMappingMetrics:
    """Track LLM-assisted mapping metrics"""

    def __init__(self):
        self.metrics = {
            "total_suggestions": 0,
            "validated_suggestions": 0,
            "human_approved": 0,
            "rejected": 0,
            "avg_validation_time": 0,
            "phi_detection_alerts": 0
        }

    def track_suggestion(self, validated: bool, approved: bool = None):
        self.metrics["total_suggestions"] += 1
        if validated:
            self.metrics["validated_suggestions"] += 1
        if approved is not None:
            if approved:
                self.metrics["human_approved"] += 1
            else:
                self.metrics["rejected"] += 1

    def get_success_rate(self) -> float:
        """Calculate success rate of LLM suggestions"""
        if self.metrics["total_suggestions"] == 0:
            return 0.0
        return (self.metrics["human_approved"] /
                self.metrics["total_suggestions"]) * 100

    def generate_report(self) -> Dict:
        """Generate metrics report"""
        return {
            **self.metrics,
            "success_rate": self.get_success_rate(),
            "validation_rate": (
                self.metrics["validated_suggestions"] /
                self.metrics["total_suggestions"] * 100
                if self.metrics["total_suggestions"] > 0 else 0
            )
        }
</code></pre>

<h2>Best Practices Summary</h2>

<div class="success-box">
<h3>Golden Rules for LLMs + FHIR</h3>
<ol>
<li><strong>De-identify First</strong>: Never send PHI to external LLMs</li>
<li><strong>Validate Always</strong>: Multi-layer validation (syntax, FHIR, profile, tests)</li>
<li><strong>Human in the Loop</strong>: Expert review for all generated mappings</li>
<li><strong>Start Small</strong>: Pilot with synthetic data, scale carefully</li>
<li><strong>Audit Everything</strong>: Log all LLM interactions and decisions</li>
<li><strong>Monitor Continuously</strong>: Track success rates and failures</li>
<li><strong>Document Thoroughly</strong>: Record LLM-assisted vs. human-created mappings</li>
</ol>
</div>

<h2>Future-Proofing</h2>

<ul>
<li><strong>Model Updates</strong>: Plan for LLM model version changes</li>
<li><strong>Cost Management</strong>: Monitor token usage and implement budgets</li>
<li><strong>Alternative Models</strong>: Test multiple LLMs for best results</li>
<li><strong>Local Models</strong>: Consider on-premise LLMs for sensitive workflows</li>
<li><strong>Continuous Improvement</strong>: Track which suggestions work best</li>
</ul>

<h2>Resources</h2>

<ul>
<li><a href="https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/artificial-intelligence/index.html" target="_blank">HHS Guidance on AI and HIPAA</a></li>
<li><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank">NIST AI Risk Management Framework</a></li>
<li><a href="https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices" target="_blank">FDA AI/ML in Medical Devices</a></li>
<li><a href="https://www.hl7.org/fhir/validation.html" target="_blank">FHIR Validation Documentation</a></li>
</ul>
        `
    }
};

// Application state
let currentPage = 'intro';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    loadPage('intro');
});

// Navigation handling
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-section a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });
}

// Load page content
function loadPage(pageId) {
    const contentArea = document.getElementById('content');

    if (content[pageId]) {
        contentArea.innerHTML = content[pageId].content;
        currentPage = pageId;

        // Update active nav link
        updateActiveNavLink(pageId);

        // Scroll to top
        window.scrollTo(0, 0);

        // Re-apply syntax highlighting
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    } else {
        contentArea.innerHTML = `
            <h1>Page Not Found</h1>
            <p>The requested page could not be found.</p>
            <a href="#intro" onclick="loadPage('intro')">Return to Introduction</a>
        `;
    }
}

// Update active navigation link
function updateActiveNavLink(pageId) {
    const navLinks = document.querySelectorAll('.nav-section a');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        searchContent(query);
    });
}

// Search through content
function searchContent(query) {
    const navLinks = document.querySelectorAll('.nav-section li');

    if (!query) {
        navLinks.forEach(item => {
            item.style.display = 'block';
        });
        return;
    }

    navLinks.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const text = link.textContent.toLowerCase();
            const page = link.getAttribute('data-page');
            const pageContent = content[page] ? content[page].content.toLowerCase() : '';

            if (text.includes(query) || pageContent.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// Handle browser back/forward
window.addEventListener('popstate', function(e) {
    const hash = window.location.hash.substring(1);
    if (hash && content[hash]) {
        loadPage(hash);
    }
});

// Update URL hash when loading pages
function loadPage(pageId) {
    window.location.hash = pageId;
    const contentArea = document.getElementById('content');

    if (content[pageId]) {
        contentArea.innerHTML = content[pageId].content;
        currentPage = pageId;
        updateActiveNavLink(pageId);
        window.scrollTo(0, 0);

        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }
}

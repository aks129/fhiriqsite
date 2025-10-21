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

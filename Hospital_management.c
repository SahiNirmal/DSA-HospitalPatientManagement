#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

typedef struct {
    int id;
    char name[50];
    int age;
    char gender[10];
    char symptoms[100];
} Patient;

Patient queue[MAX];
int front = -1, rear = -1;

// Function prototypes
int isFull();
int isEmpty();
Patient inputPatient();
void enqueue();
void dequeue();
void display();
void findById();
void countPatients();
void saveToFile(Patient p);

// Check if queue is full
int isFull() {
    return rear == MAX - 1;
}

// Check if queue is empty
int isEmpty() {
    return front == -1 || front > rear;
}

// Take patient input with validation
Patient inputPatient() {
    Patient p;
    printf("Enter Patient ID: ");
    scanf("%d", &p.id);

    printf("Enter Name: ");
    scanf(" %[^\n]s", p.name);

    do {
        printf("Enter Age: ");
        scanf("%d", &p.age);
        if (p.age <= 0) printf("Invalid age. Try again.\n");
    } while (p.age <= 0);

    printf("Enter Gender (Male/Female/Other): ");
    scanf("%s", p.gender);

    printf("Enter Symptoms: ");
    scanf(" %[^\n]s", p.symptoms);

    return p;
}

// Add a patient to the queue
void enqueue() {
    if (isFull()) {
        printf("Queue is full! Cannot add new patient.\n");
        return;
    }

    Patient p = inputPatient();

    if (front == -1) front = 0;
    rear++;
    queue[rear] = p;

    saveToFile(p);
    printf(" Patient added successfully!\n");
}

// Serve next patient
void dequeue() {
    if (isEmpty()) {
        printf("No patients in queue.\n");
        return;
    }

    printf("\n Serving Patient:\n");
    printf("ID: %d | Name: %s | Age: %d | Gender: %s | Symptoms: %s\n",
           queue[front].id, queue[front].name, queue[front].age,
           queue[front].gender, queue[front].symptoms);

    front++;
    if (front > rear) front = rear = -1;
}

// Display all waiting patients
void display() {
    if (isEmpty()) {
        printf("No patients are waiting in the queue.\n");
        return;
    }

    printf("\n Patients Waiting in Queue:\n");
    printf("-------------------------------------------------------------\n");
    for (int i = front; i <= rear; i++) {
        printf("ID: %d | Name: %s | Age: %d | Gender: %s | Symptoms: %s\n",
               queue[i].id, queue[i].name, queue[i].age,
               queue[i].gender, queue[i].symptoms);
    }
    printf("-------------------------------------------------------------\n");
}

// Find patient by ID
void findById() {
    if (isEmpty()) {
        printf(" Queue is empty.\n");
        return;
    }

    int id;
    printf("Enter Patient ID to search: ");
    scanf("%d", &id);

    for (int i = front; i <= rear; i++) {
        if (queue[i].id == id) {
            printf("Patient Found:\n");
            printf("ID: %d | Name: %s | Age: %d | Gender: %s | Symptoms: %s\n",
                   queue[i].id, queue[i].name, queue[i].age,
                   queue[i].gender, queue[i].symptoms);
            return;
        }
    }

    printf("No patient with ID %d found in queue.\n", id);
}

// Count total patients
void countPatients() {
    if (isEmpty())
        printf("Total patients: 0\n");
    else
        printf("Total patients in queue: %d\n", rear - front + 1);
}

// Save patient to file
void saveToFile(Patient p) {
    FILE *fp = fopen("patients.txt", "a");
    if (fp == NULL) {
        printf(" Error saving to file.\n");
        return;
    }
    fprintf(fp, "ID: %d | Name: %s | Age: %d | Gender: %s | Symptoms: %s\n",
            p.id, p.name, p.age, p.gender, p.symptoms);
    fclose(fp);
}

int main() {
    int choice;
    do {
        printf("\n==== Hospital Patient Management System ====\n");
        printf("1. Add New Patient (Enqueue)\n");
        printf("2. Serve Next Patient (Dequeue)\n");
        printf("3. Display All Waiting Patients\n");
        printf("4. Find Patient by ID\n");
        printf("5. Count Total Patients\n");
        printf("6. Check if Queue is Full\n");
        printf("7. Check if Queue is Empty\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: enqueue(); break;
            case 2: dequeue(); break;
            case 3: display(); break;
            case 4: findById(); break;
            case 5: countPatients(); break;
            case 6: printf("Queue is %s.\n", isFull() ? "Full" : "Not Full"); break;
            case 7: printf("Queue is %s.\n", isEmpty() ? "Empty" : "Not Empty"); break;
            case 0: printf("Thank you for using the system!\n"); break;
            default: printf(" Invalid choice. Try again!\n");
        }
    } while (choice != 0);

    return 0;
}
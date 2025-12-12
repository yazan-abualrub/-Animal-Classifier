## Animal Classifier

An intelligent, web-based image classifier that uses transfer learning with **MobileNetV2** to accurately identify various animals, including Cats, Dogs, and Wildlife. The application features a lightweight front-end for image submission and a high-performance backend for inference.

### ✨ Key Features

* **Transfer Learning:** Utilizes the pre-trained **MobileNetV2** model for fast and accurate classification.
* **Categories:** Classifies images into categories such as Cat, Dog, Wild, etc. (customize this list).
* **Lightweight Backend:** Powered by **FastAPI** for asynchronous and high-speed API serving.
* **Web Interface:** Simple, responsive user interface built with HTML, CSS, and vanilla JavaScript.

---

### 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites

You will need the following software installed:

* **Python 3.8+**
* **pip** (Python package installer)

#### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Set up the Python Virtual Environment (Recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install the required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```
    *(**Note:** Ensure your `requirements.txt` includes essential libraries like `fastapi`, `uvicorn`, `tensorflow`, `numpy`, and `Pillow`)*

4.  **Model File:**
    * Place your trained MobileNetV2 model file (e.g., `model.h5` or a saved model directory) into the `app/` folder (or where your FastAPI logic loads it).

---

### ⚙️ How to Run the Application

The project consists of two main parts: the Backend (FastAPI) and the Frontend (HTML/JS).

#### 1. Start the FastAPI Backend

Run the server using `uvicorn`. This command will start the API server, typically on port 8000.

```bash
uvicorn app.main:app --reload

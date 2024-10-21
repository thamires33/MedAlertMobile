# Medalert - Django

### Leia tudo, mas principalmente as [instruções iniciais](#instruções-iniciais), para que o projeto funcione.

<br>

## Para preparar a inicialização da aplicação

<br>

### Criando ambiente virtual

```
\> python -m venv <name venv>
```

<br>

## Iniciando ambiente virtual

#### Linux

```
\> source venv/bin/activate
```

#### Windows

```
\> .\venv\Scripts\activate
```

<br>

## Desativando ambiente virtual

<br>

```
\> deactivate
```

---

<br>

### Instalando dependências
- Instale na venv preferencialmente

```
(venv) \> pip install -r requirements.txt
```
<br>

---

<br>


## Aplicando as migrações

```
\> python manage.py makemigrations // Provavelmente não será necessário, porque deixarei um arquivo com a migração inicial
\> python manage.py migrate
```

<br>

## Criando super usuário

```
\> python manage.py createsuperuser
```

<br>

## Iniciar o projeto (endereço e porta opcionais, porta padrão 8000)


```
\> python manage.py runserver <endereço IP>:<port>
```

<br>

OBS: Recomendo rodar com o seguinte comando:

```
\> python.exe .\manage.py runserver 0.0.0.0:8000
```

<br>

- Crie um arquivo [.env](/.env) com as seguintes informações:

```
# General configs

DEBUG=False
ENVIRONMENT=sqlite / local / production # Escolha se usará o SQLITE, mysql local ou banco de produção
SECRET_KEY='?'
ALLOWED_HOSTS=*
CSRF_TRUSTED_ORIGINS=http://localhost:<porta frontend>
CORS_ALLOWED_ORIGINS=*

# Database - Local

DB_DATABASE=?
DB_USER=?
DB_PASSWORD=?
DB_HOST=?
DB_PORT=?

# Database - Production

PROD_DATABASE=?
PROD_USER=?
PROD_PASSWORD=?
PROD_HOST=?
PROD_PORT=?


# Email

EMAIL_HOST_USER=?
EMAIL_HOST_PASSWORD=?
```
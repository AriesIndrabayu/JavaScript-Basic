from pydantic import BaseModel


class NoteCreate(BaseModel):
    judul: str
    isi: str


class Note(NoteCreate):
    id: int

    class Config:
        orm_mode = True
